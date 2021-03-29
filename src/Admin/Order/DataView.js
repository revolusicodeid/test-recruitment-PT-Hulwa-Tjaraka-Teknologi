import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import { getRequestLess } from '../../Service/Request/FormRequest';
import { API_URL } from '../../Setting/env';
import { ProgressContext } from "../../Service/Context/ProgressContext";


const headCells = [
  { id: 'id', label: 'ID',numeric: false, disablePadding: true, width: 50 },
  { id: 'kode', label: 'Code', numeric: false, disablePadding: true, width: 150 },
  { id: 'date', label: 'Date', numeric: false, disablePadding: true, width: 150 },
  { id: 'services', label: 'Services', numeric: false, disablePadding: true, width: 150 },
  {
    id: 'weight',
    label: 'Weight',
    numeric: true, disablePadding: false,
    width: 90 },
  {
    id: 'qty',
    label: 'Qty',
    numeric: true, disablePadding: false,
    width: 90 },
  { id: 'destination', label: 'Destination', numeric: false, disablePadding: true, width: 150 },
  { id: 'shipper_cust_id', label: 'Shipper Cust Id', numeric: false, disablePadding: true, width: 150 },
  { id: 'shipper_name', label: 'Shipper Name', numeric: false, disablePadding: true, width: 150 },
  { id: 'shipper_phone', label: 'Shipper Phone', numeric: false, disablePadding: true, width: 150 },
  { id: 'receiver_name', label: 'Receiver Name', numeric: false, disablePadding: true, width: 150 },
  { id: 'receiver_phone', label: 'Receiver Phone', numeric: false, disablePadding: true, width: 150 },
  { id: 'goods_desc', label: 'Goods desc', numeric: false, disablePadding: true, width: 150 },
  //{ id: 'insurance', label: 'Insurance', numeric: false, disablePadding: true, width: 150 },
  { id: 'payment_type', label: 'Payment Type', numeric: false, disablePadding: true, width: 150 },
  { id: 'voucher_no', label: 'Voucher No', numeric: false, disablePadding: true, width: 150 },
  {
    id: 'voucher_amt',
    label: 'Voucher Amt',
    numeric: true, disablePadding: false,
    width: 90 },
  {
    id: 'amount',
    label: 'Amount',
    numeric: true, disablePadding: false,
  width: 90 },
  {
    id: 'pajak',
    label: 'Pajak',
    numeric: true, disablePadding: false,
    width: 90 },
  { id: 'user_id', label: 'User Id', numeric: false, disablePadding: true, width: 150 },
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



const DataView = () => {
  const { setShowProgress } = useContext(ProgressContext);
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [emptyRows, setEmptyRows] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsOnPage, setRowsOnPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [searchPath, setSearchPath] = useState("");
  const [url, setUrl] = useState(`${API_URL}/orders?page=${page}&rowsPerPage=${rowsPerPage}&search=${searchPath}`);

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

  const handleClick = (event,id) => {
    const selectedIndex = selected.indexOf(id);
    console.log(id);
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
    setUrl(`${API_URL}/orders?page=${newPage+1}&rowsPerPage=${rowsPerPage}&search=${searchPath}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRows([]);
    setUrl(`${API_URL}/orders?page=1&rowsPerPage=${parseInt(event.target.value, 10)}&search=${searchPath}`);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  
  const handleOnSearch = (event) => {
    const val = event.target.value;
    const path = val.split('\n').join('-');
    const str = "";
    setSearchPath(path);
    setRows([]);
    val.localeCompare(str) === 0 ? 
    setUrl(`${API_URL}/orders?page=1&rowsPerPage=${rowsPerPage}&search=${path}`) 
    : setUrl(`${API_URL}/orders?page=${page}&rowsPerPage=${rowsPerPage}&search=${path}`);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  
  useEffect(() => {
    const fetchData = async () => {
      
      const result = await getRequestLess(url,null,true,setShowProgress).then(res=>{
        return res;
      });
      function createData(id,kode,date,services,weight,qty,destination,shipper_cust_id,shipper_name,shipper_phone,receiver_name,receiver_phone,goods_desc,payment_type,voucher_no,voucher_amt,amount,pajak,user_id) {
        return { id,kode,date,services,weight,qty,destination,shipper_cust_id,shipper_name,shipper_phone,receiver_name,receiver_phone,goods_desc,payment_type,voucher_no,voucher_amt,amount,pajak,user_id };
      }
      const addData = (createData) => {
        return function(item){
          const val = createData(
            item.id,
            item.code,
            item.shipper_date,
            item.service,
            item.invoice_orders_data[0].weight,
            item.invoice_orders_data[0].qty,
            item.destination,
            item.shipper,
            item.vendors_data.name,
            item.vendors_data.contact,
            item.customer,
            item.contact,
            item.goods_data.name,
            item.payment_types_data.name,
            item.purcash_orders_data[0].voucher_number,
            item.purcash_orders_data[0].voucher_amount,
            item.invoice_orders_data[0].amount,
            item.purcash_orders_data[0].tax,
            item.review
          );
          return setRows(prevState => ([
            ...prevState, val 
          ]));
        }
      };
      
      await result.data.data.map(addData(createData));
      setTotalRows(parseInt(result.data.total,10));
      setRowsPerPage(parseInt(result.data.per_page,10));
      setEmptyRows(parseInt(result.data.per_page,10) - parseInt(result.data.data.length,10));
      setRowsOnPage(parseInt(result.data.data.length,10));
      setPage(result.data.current_page - 1);
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
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  return (
                    
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event,row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell >{row.kode}</TableCell>
                      <TableCell >{row.date}</TableCell>
                      <TableCell >{row.services}</TableCell>
                      <TableCell align="right">{row.weight}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
                      <TableCell >{row.destination}</TableCell>
                      <TableCell >{row.shipper_cust_id}</TableCell>
                      <TableCell style={{minWidth:300}}>{row.shipper_name}</TableCell>
                      <TableCell >{row.shipper_phone}</TableCell>
                      <TableCell >{row.receiver_name}</TableCell>
                      <TableCell >{row.receiver_phone}</TableCell>
                      <TableCell >{row.goods_desc}</TableCell>
                      <TableCell >{row.payment_type}</TableCell>
                      <TableCell >{row.voucher_no}</TableCell>
                      <TableCell align="right">{row.voucher_amt}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.pajak}</TableCell>
                      <TableCell >{row.user_id}</TableCell>
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
          rowsPerPageOptions={[5, 10, 25]}
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

export default DataView;