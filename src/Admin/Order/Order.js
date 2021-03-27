import React, {useState} from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { CloudUpload, Close } from '@material-ui/icons';
import DataView from './DataView';
import DataForm from './DataForm';


const useStyles = makeStyles((theme) => ({
  content: {
    color: 'inherit',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    width: '100%',
  },
  content_header: {
    background: '#2c2c2c',
    color: '#e9e9e9',
    padding: '0.5rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content_body: {
    width : '100%',
  },
  button: {
    margin: theme.spacing(1),
    height: '2rem'
  },
  form: {
      width: 'auto',
      height: 600
  },
  table: {
    width : '100%',
  },
}));

const Order = () => {
  const classes = useStyles();
  const [view_form, setViewForm] = useState(false);
  const handleFormViewOnClick = () =>{
    view_form ? setViewForm(false) : setViewForm(true);
  }
  
  return (
    <div className={classes.content}>
        <div className={classes.content_header}>
          <h1>Pendapatan Ekspedisi</h1>
          {
              view_form ? 
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<Close />}
                onClick={handleFormViewOnClick}
              >
                Cancel
              </Button>
              :
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUpload />}
                onClick={handleFormViewOnClick}
              >
                Upload
              </Button>
          }
          
        </div>
        <div className={classes.content_body}>
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
        </div>
    </div>
  );
}

export default Order;