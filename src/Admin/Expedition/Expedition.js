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

const Expedition = () => {
  const classes = useStyles();
  const [view_form, setViewForm] = useState(false);
  const handleFormViewOnClick = () =>{
    view_form ? setViewForm(false) : setViewForm(true);
  }
  
  return (
    <div className={classes.content}>
      <Grid container direction={'column'} spacing={3}>
          <Grid className={classes.content_header} container spacing={1}>
            <Grid item xs={11} >
              <Typography variant="subtitle1" noWrap>
                Ekspedisi
              </Typography>
            </Grid>
            <Grid item xs={1} >
              {
                  view_form ? 
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<Close />}
                    onClick={handleFormViewOnClick}
                  >
                    Cancel
                  </Button>
                  :
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<AddBox />}
                    onClick={handleFormViewOnClick}
                  >
                    Tambah
                  </Button>
              }
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.content_body} >
            {
                view_form ? 
                <div className={classes.form}>
                    <DataForm setViewform={setViewForm} />
                </div>
                :
                <div className={classes.table}>
                    <DataView />
                </div>
            }
          </Grid>
      </Grid> 
    </div>
  );
}

export default Expedition;