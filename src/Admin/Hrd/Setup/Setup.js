import React, {useState} from 'react';
import { 
  makeStyles, 
  Button,
  Grid, 
  Typography 
} from '@material-ui/core';
import { AddBox, Close } from '@material-ui/icons';
import DataFormOne from './DataFormOne';
import DataViewOne from './DataViewOne';
import DataFormTwo from './DataFormTwo';
import DataViewTwo from './DataViewTwo';


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

const Setup = () => {
  const classes = useStyles();
  const [view_form, setViewForm] = useState({form_1 : false, form_2 : false});
  const [edit_data, setEditData] = useState(null);
  
  
  return (
    <div className={classes.content}>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={6} >
            <Grid container direction={'column'}>
                <Grid className={classes.content_header} justify="space-between" container spacing={1}>
                  <Grid item xs={2} >
                    <Typography variant="subtitle1" noWrap>
                      Divisi
                    </Typography>
                  </Grid>
                  <Grid item xs={2} >
                    {
                        view_form.form_1 ? 
                        <Button
                          variant="contained"
                          color="default"
                          startIcon={<Close />}
                          onClick={() => setViewForm(prevState => ({ ...prevState,  form_1: false }))}
                        >
                          Cancel
                        </Button>
                        :
                        <Button
                          variant="contained"
                          color="default"
                          startIcon={<AddBox />}
                          onClick={() => setViewForm(prevState => ({ ...prevState,  form_1: true }))}
                        >
                          Tambah
                        </Button>
                    }
                  </Grid>
                </Grid>
                <Grid className={classes.content_body} >
                  <Grid item xs={12} >
                  {
                      view_form.form_1 ? 
                      <div className={classes.form}>
                          <DataFormOne setViewForm={setViewForm} editData={edit_data}/>
                      </div>
                      :
                      <div className={classes.table} setEditData={setEditData}>
                          <DataViewOne />
                      </div>
                  }
                  </Grid>
                </Grid>
            </Grid> 
        </Grid>
        <Grid item xs={6} >
            <Grid container direction={'column'}>
                <Grid className={classes.content_header} justify="space-between" container spacing={1}>
                  <Grid item xs={2} >
                    <Typography variant="subtitle1" noWrap>
                      Jabatan
                    </Typography>
                  </Grid>
                  <Grid item xs={2} >
                    {
                        view_form.form_2 ? 
                        <Button
                          variant="contained"
                          color="default"
                          startIcon={<Close />}
                          onClick={() => setViewForm(prevState => ({ ...prevState,  form_2: false }))}
                        >
                          Cancel
                        </Button>
                        :
                        <Button
                          variant="contained"
                          color="default"
                          startIcon={<AddBox />}
                          onClick={() => setViewForm(prevState => ({ ...prevState,  form_2: true }))}
                        >
                          Tambah
                        </Button>
                    }
                  </Grid>
                </Grid>
                <Grid className={classes.content_body} >
                  <Grid item xs={12} >
                  {
                      view_form.form_2 ? 
                      <div className={classes.form}>
                          <DataFormTwo setViewForm={setViewForm} editData={edit_data}/>
                      </div>
                      :
                      <div className={classes.table} setEditData={setEditData}>
                          <DataViewTwo />
                      </div>
                  }
                  </Grid>
                </Grid>
            </Grid> 
        </Grid>
      </Grid>
    </div>
  );
}

export default Setup;