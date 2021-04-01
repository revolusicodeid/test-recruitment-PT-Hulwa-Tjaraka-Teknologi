import React, {useState} from 'react';
import { makeStyles, Button } from '@material-ui/core';
import DataView from './DataView';


const useStyles = makeStyles((theme) => ({
  content: {
    color: 'inherit',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
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
      width: '100%',
      height: 600
  },
  table: {
    width : '100%',
  },
}));

const History = () => {
  const classes = useStyles();
  const [view_form, setViewForm] = useState(false);
  const handleFormViewOnClick = () =>{
    view_form ? setViewForm(false) : setViewForm(true);
  }
  
  return (
    <div className={classes.content}>
        <div className={classes.content_header}>
          <h1>History</h1>
        </div>
        <div className={classes.content_body}>
            <div className={classes.table}>
                <DataView />
            </div>
        </div>
    </div>
  );
}

export default History;