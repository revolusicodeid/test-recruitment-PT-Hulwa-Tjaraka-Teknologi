import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { 
    lighten, 
    makeStyles,
    Table,
    TextareaAutosize,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    IconButton,
    Tooltip,
    FormControlLabel,
    Switch
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { getRequestLess } from '../../../Service/Request/FormRequest';
import { API_URL } from '../../../Setting/env';
import { ProgressContext } from "../../../Service/Context/ProgressContext";


const headCells = [
  { id: 'jabatan_id', label: 'ID', numeric: false, disablePadding: true, width: 300 },
  { id: 'code', label: 'Code', numeric: false, disablePadding: true, width: 50 },
  { id: 'name', label: 'Name',numeric: false, disablePadding: true, width: 150 },
  { id: 'author', label: 'Author', numeric: false, disablePadding: true, width: 300 },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{minWidth:headCell.width}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, onTextChange } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Data
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <TextareaAutosize
          rowsMax={4}
          aria-label="Search"
          placeholder="Multiple Search"
          style={{maxWidth:300, width:'40%'}}
          onChange={onTextChange}
        />
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onTextChange: PropTypes.func.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));



const DataViewTwo = () => {
  const { setShowProgress } = useContext(ProgressContext);
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rowsOnPage, setRowsOnPage] = useState(0);
  const [emptyRows, setEmptyRows] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState([]);
  const [searchPath, setSearchPath] = useState("");
  const [url, setUrl] = useState(`${API_URL}/hrd-service/jabatan/list/0/${rowsPerPage}`);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setRows([]);
    setUrl(`${API_URL}/hrd-service/jabatan/list/0/10`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRows([]);
    setUrl(`${API_URL}/hrd-service/jabatan/list/0/10`);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  
  const handleOnSearch = (event) => {
    //const val = event.target.value;
    //const path = val.split('\n').join('-');
    //const str = "";
    //setSearchPath(path);
    //setRows([]);
    //val.localeCompare(str) === 0 ? 
    //setUrl(`${API_URL}/hrd-service/jabatan/list?page=1&rowsPerPage=${rowsPerPage}&search=${path}`) 
    //: setUrl(`${API_URL}/hrd-service/jabatan/list?page=${page}&rowsPerPage=${rowsPerPage}&search=${path}`);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  
  useEffect(() => {
    const fetchData = async () => {
      
      const result = await getRequestLess(url,null,true,setShowProgress).then(res=>{
        return res;
      });
      function createData(
        name,
        code,
        jabatan_id,
        author
        ) {
        return { 
          name,
          code,
          jabatan_id,
          author
        };
      }
      const addData = (createData) => {
        return function(item){
          const val = createData(
            item.name,
            item.code,
            item.jabatan_id,
            item.author
          );
          return setRows(prevState => ([
            ...prevState, val
          ]));
        }
      };
      
      await result.jabatan.map(addData(createData));
      setTotalRows(parseInt(result.count,10));
      setRowsPerPage(parseInt(10,10));
      setEmptyRows(parseInt(10,10) - result.jabatan.length);
      setPage(1);
      setRowsOnPage(parseInt(result.jabatan.length,10));
    };
    setShowProgress(true);
    fetchData();
  }, [url,setShowProgress]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          onTextChange={handleOnSearch}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsOnPage}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.jabatan_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.jabatan_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.jabatan_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.jabatan_id}
                      </TableCell>
                      <TableCell >{row.code}</TableCell>
                      <TableCell >{row.name}</TableCell>
                      <TableCell >{row.author}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10,20]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

export default DataViewTwo;