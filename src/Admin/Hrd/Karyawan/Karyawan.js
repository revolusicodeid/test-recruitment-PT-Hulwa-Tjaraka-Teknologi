import React, {useState} from 'react';
import { 
  makeStyles, 
  Button,
  Grid, 
  Typography 
} from '@material-ui/core';
import { AddBox, Close } from '@material-ui/icons';
import DataView from './DataView';
import DataForm from './DataForm';
import { USER } from '../../../Setting/env';


const useStyles = makeStyles((theme) => ({
  content: {
    color: 'inherit',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    width: '100%',
    marginTop: theme.spacing(4)
  },
  content_header: {
    background: '#2c2c2c',
    color: '#e9e9e9',
    padding: '0.5rem 1rem',
  },
  content_body: {
    width : '100%',
  },
  form: {
      width: 'auto',
  },
  table: {
    width : '100%',
  },
}));

const Karyawan = () => {
  const classes = useStyles();
  const [view_form, setViewForm] = useState(false);
  const [edit_data, setEditData] = useState([]);
  const accsess_create = USER ? USER.accessrole.hrd.karyawan.create : false;
  
  return (
    <div className={classes.content}>
      <Grid container direction={'column'}>
          <Grid className={classes.content_header} justify="space-between" container spacing={1}>
            <Grid item xs={2} >
              <Typography variant="subtitle1" noWrap>
                Karyawan
              </Typography>
            </Grid>
            <Grid item xs={1} >
              {
                accsess_create ?(
                    view_form ? 
                    <Button
                      variant="contained"
                      color="default"
                      startIcon={<Close />}
                      onClick={() => {setEditData([]);setViewForm(false)}}
                    >
                      Cancel
                    </Button>
                    :
                    <Button
                      variant="contained"
                      color="default"
                      startIcon={<AddBox />}
                      onClick={() => {setEditData([]);setViewForm(true)}}
                    >
                      Tambah
                    </Button>
                  ) :
                  ""
              }
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.content_body} >
            {
                view_form ? 
                <div className={classes.form}>
                    <DataForm setViewForm={setViewForm} editData={edit_data}/>
                </div>
                :
                <div className={classes.table}>
                    <DataView setViewForm={setViewForm} setEditData={setEditData} />
                </div>
            }
          </Grid>
      </Grid> 
    </div>
  );
}

export default Karyawan;