import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
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
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import LuxonUtils from '@date-io/luxon';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

function createData(id, code, name, status, amount, price) {
  return { 
        id, 
        code, 
        name, 
        status, 
        amount, 
        price,
        detail: [
          { date: '2020-01-05', outcome_types: 'Pembayaran Aplikasi', type:'kredit', amount: 1, price:10000 },
          { date: '2020-01-02', outcome_types: 'Gaji Karyawan', type:'cash', amount: 1, price:20000 },
          { date: '2020-01-02', outcome_types: 'Gaji Driver', type:'cash', amount: 1, price:30000 },
        ],
    };
}

function Row(props) {
    const { row, rowIsSelected, rowHandleClick, labelId } = props;
    const isItemSelected = rowIsSelected(row.id);

    return (
    <React.Fragment>
      <TableRow
        hover
        onClick={(event) => rowHandleClick(event, row.id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small" >
            {isItemSelected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.id}
        </TableCell>
        <TableCell >{row.code}</TableCell>
        <TableCell >{row.name}</TableCell>
        <TableCell >{row.status}</TableCell>
        <TableCell align="right">{row.amount}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
      <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={isItemSelected} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
              Detail
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Jenis Pengeluaran</TableCell>
                  <TableCell align="right">Type Pembayaran</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total price (Rp)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.detail.map((detailRow) => (
                  <TableRow key={detailRow.date}>
                    <TableCell component="th" scope="row">
                      {detailRow.date}
                    </TableCell>
                    <TableCell>{detailRow.outcome_types}</TableCell>
                    <TableCell >{detailRow.type}</TableCell>
                    <TableCell align="right">{detailRow.amount}</TableCell>
                    <TableCell align="right">{detailRow.price}</TableCell>
                    <TableCell align="right">
                      {Math.round(detailRow.amount * detailRow.price * 100) / 100}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
    </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      detail: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            outcome_types: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
        }),
      ).isRequired,
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
    rowHandleClick : PropTypes.func.isRequired,
    rowIsSelected : PropTypes.func.isRequired,
    labelId : PropTypes.string.isRequired,
  };

const rows = [
  createData(1,'PI-00001','Pembayaran Operasional Bulan Januari #1', 'diapprove', 3, 10000),
  createData(2,'PI-00002','Pembayaran Operasional Bulan Januari #2', 'diapprove', 3, 20000),
  createData(3,'PI-00003','Pembayaran Operasional Bulan Februari #1', 'diterima', 3, 30000),
  createData(4,'PI-00004','Pembayaran Operasional Bulan Februari #2', 'diterima', 3, 10000),
  createData(5,'PI-00005','Pembayaran Operasional Bulan Februari #3', 'disubmit', 3, 20000),
  createData(6,'PI-00006','Pembayaran Operasional Bulan Maret #1', 'disubmit', 3, 30000),
  createData(7,'PI-00007','Pembayaran Operasional Bulan Maret #2', 'disimpan', 3, 10000),
  createData(8,'PI-00008','Pembayaran Operasional Bulan Mei #1', 'disimpan', 3, 20000),
  createData(9,'PI-00009','Pembayaran Operasional Bulan Mei #2', 'diapprove', 3, 30000),
  createData(10,'PI-000010','Pembayaran Operasional Bulan Mei #3', 'diapprove', 3, 10000),
  createData(11,'PI-000011','Pembayaran Operasional Bulan Mei #4', 'diapprove', 3, 20000),
  createData(12,'PI-000012','Pembayaran Operasional Bulan Desember #1', 'diapprove', 3, 30000),
  createData(13,'PI-000013','Pembayaran Operasional Bulan Desember #1', 'diapprove', 3, 10000),
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

const headCells = [
  { id: 'id', numeric: true, disablePadding: true, label: 'Id' },
  { id: 'code', numeric: false, disablePadding: false, label: 'Code' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Total' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
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
  button: {
    margin: theme.spacing(3),
    height: '2rem',
    minWidth: '20%'
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [selectedDateStart, handleDateChangeStart] = useState(new Date());
  const [selectedDateEnd, handleDateChangeEnd] = useState(new Date());

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
        ""
      ) : (
          <React.Fragment>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CloudDownloadIcon />}
            >
              Download Excel
            </Button>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <KeyboardDatePicker
                  required
                  margin="normal"
                  id="date-picker-dialog"
                  label="Tanggal Mulai"
                  format="MM/dd/yyyy"
                  value={selectedDateStart}
                  onChange={handleDateChangeStart}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <KeyboardDatePicker
                  required
                  margin="normal"
                  id="date-picker-dialog"
                  label="Tanggal Akhir"
                  format="MM/dd/yyyy"
                  value={selectedDateEnd}
                  onChange={handleDateChangeEnd}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
            </MuiPickersUtilsProvider>

          </React.Fragment>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
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

export default function DataView() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
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
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                    <Row row={row} rowIsSelected={isSelected} rowHandleClick={handleClick} labelId={`enhanced-table-checkbox-${index}`}/>
                    )  
                )}
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
          count={rows.length}
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
