import React, {useState, useEffect, useContext, Fragment} from 'react';
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
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { getRequestLess, postRequestLess } from '../../../Service/Request/FormRequest';
import { API_URL, TOKEN, USER } from '../../../Setting/env';
import { ProgressContext } from "../../../Service/Context/ProgressContext";
import { toast } from 'react-toastify';
import Confirm from "../../../Layout/Main/Confirm"


const headCells = [
  { id: 'karyawan_id', label: 'ID', numeric: false, disablePadding: true, width: 300 },
  { id: 'nik', label: 'nik', numeric: false, disablePadding: true, width: 50 },
  { id: 'name', label: 'name',numeric: false, disablePadding: true, width: 150 },
  { id: 'phone', label: 'phone', numeric: false, disablePadding: true, width: 300 },
  { id: 'email', label: 'email', numeric: false, disablePadding: true, width: 300 },
  { id: 'divisi', label: 'divisi', numeric: false, disablePadding: true, width: 300 },
  { id: 'jabatan', label: 'jabatan', numeric: false, disablePadding: true, width: 300 },
  { id: 'author', label: 'author', numeric: false, disablePadding: true, width: 300 },
];

const accsess_edit = USER ? USER.accessrole.hrd.karyawan.update : false;
const accsess_delete = USER ? USER.accessrole.hrd.karyawan.delete : false;

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
  const { numSelected, onTextChange, onEditData, onDeleteData } = props;

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

      {
      numSelected > 0 ? ( 
        numSelected === 1 ? (
          <Fragment>
            {
            accsess_edit ? (
              <Tooltip title="Edit">
              <IconButton 
              aria-label="edit"
              onClick={onEditData}
              >
                <EditIcon />
              </IconButton>
              </Tooltip>
            ) : ("") }
            
            { accsess_delete ? (
              <Tooltip title="Delete">
              <IconButton 
              aria-label="delete"
              onClick={onDeleteData}
              >
                <DeleteIcon />
              </IconButton>
              </Tooltip>
            ) : ("") }

          </Fragment>
          ) : (
            <Fragment>
              
              { accsess_delete ? (
                <Tooltip title="Delete">
                <IconButton 
                aria-label="delete"
                onClick={onDeleteData}
                >
                  <DeleteIcon />
                </IconButton>
                </Tooltip>
              ) : ("") }

            </Fragment>
          )
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
  onTextChange: PropTypes.func.isRequired,
  onEditData: PropTypes.func.isRequired,
  onDeleteData: PropTypes.func.isRequired,
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

const SEARCH_URL = `${API_URL}/user-service/user/search`;
const DELETE_URL = `${API_URL}/user-service/user/`;

const DataViewOne = (view) => {
  const { setShowProgress } = useContext(ProgressContext);
  const {setViewForm, setEditData} = view;
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
  const [url, setUrl] = useState(`${API_URL}/user-service/user/list/0/${rowsPerPage}`);
  const [refresh, setRefresh] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [msgConfirm, setMsgConfirm] = useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.karyawan_id);
      setSelected(newSelecteds);
      setEditData(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, karyawan_id) => {
    const selectedIndex = selected.indexOf(karyawan_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, karyawan_id);
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
    setEditData(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setRows([]);
    setUrl(`${API_URL}/user-service/user/list/0/10`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRows([]);
    setUrl(`${API_URL}/user-service/user/list/0/10`);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  
  const handleOnSearch = async (event) => {
    const val = event.target.value;
    setRows([]);
    setShowProgress(true);
    postRequestLess(SEARCH_URL,{keyword:val},handleSearchRequest,setShowProgress,true,TOKEN);
  };

  const handleSearchRequest = (result) => {
    function createData(
      karyawan_id,
      nik,
      name,
      phone,
      email,
      divisi,
      jabatan,
      author
      ) {
      return { 
        karyawan_id,
        nik,
        name,
        phone,
        email,
        divisi,
        jabatan,
        author
      };
    }
    const addData = (createData) => {
      return function(item){
        const val = createData(
          item.karyawan_id,
          item.nik,
          item.name,
          item.phone,
          item.email,
          item.divisi.name,
          item.jabatan.name,
          item.author
        );
        return setRows(prevState => ([
          ...prevState, val
        ]));
      }
    };
    result.data.map(addData(createData));
    setTotalRows(parseInt(result.count,10));
    setRowsPerPage(parseInt(10,10));
    setEmptyRows(parseInt(10,10) - result.data.length);
    setPage(0);
    setRowsOnPage(parseInt(result.data.length,10));
  }

  const handleOnEditData = () =>{
    setViewForm(true);
  }
  
  const handleOnDeleteData = () =>{
    setMsgConfirm("Anda Yakin ingin delete data?");
    setOpenConfirm(true);
  }

  const handleDeleteConfirm = (result) =>{
    if(result){
      selected.map( val => {
        const url = `${DELETE_URL}/${val}`;
        deleteRequest(url);
      });
      setSelected([]);
      setRefresh(!refresh);
    }
  }

  const deleteRequest = async (url) => {
      setShowProgress(true);
      const result = await getRequestLess(url,null,true,setShowProgress,null,'delete');
      result.msg.localeCompare("SUCCESS") ? toast.success(result.msg + " delete item") : toast.error(result.msg + " delete item");
      return result.msg;
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;
  
  useEffect(() => {
    const fetchData = async () => {
      
      const result = await getRequestLess(url,null,true,setShowProgress).then(res=>{
        return res;
      });
      function createData(
        karyawan_id,
        nik,
        name,
        phone,
        email,
        divisi,
        jabatan,
        author
        ) {
        return { 
          karyawan_id,
          nik,
          name,
          phone,
          email,
          divisi,
          jabatan,
          author
        };
      }
      const addData = (createData) => {
        return function(item){
          const val = createData(
            item.karyawan_id,
            item.nik,
            item.name,
            item.phone,
            item.email,
            item.divisi.name,
            item.jabatan.name,
            item.author
          );
          return setRows(prevState => ([
            ...prevState, val
          ]));
        }
      };
      await result.data.map(addData(createData));
      setTotalRows(parseInt(result.count,10));
      setRowsPerPage(parseInt(10,10));
      setEmptyRows(parseInt(10,10) - result.data.length);
      setPage(0);
      setRowsOnPage(parseInt(result.data.length,10));
    };
    setShowProgress(true);
    fetchData();
  }, [url,setShowProgress,refresh]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          onTextChange={handleOnSearch}
          onEditData={handleOnEditData}
          onDeleteData={handleOnDeleteData}
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
                  const isItemSelected = isSelected(row.karyawan_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.karyawan_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.karyawan_id)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.karyawan_id}
                      </TableCell>
                      <TableCell >{row.nik}</TableCell>
                      <TableCell >{row.name}</TableCell>
                      <TableCell >{row.phone}</TableCell>
                      <TableCell >{row.email}</TableCell>
                      <TableCell >{row.divisi}</TableCell>
                      <TableCell >{row.jabatan}</TableCell>
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
      <Confirm open={openConfirm} setOpen={setOpenConfirm} handleConfirm={handleDeleteConfirm} msg={msgConfirm}/>
    </div>
  );
}

export default DataViewOne;