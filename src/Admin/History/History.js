import React from 'react';
import { 
  makeStyles, 
  Grid, 
  Typography 
} from '@material-ui/core';
import DataView from './DataView';


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

const History = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.content}>
      <Grid container direction={'column'} spacing={3}>
          <Grid className={classes.content_header} container spacing={1}>
            <Grid item xs={12} >
              <Typography variant="subtitle1" noWrap>
                History
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.content_body} >
              <div className={classes.table}>
                  <DataView />
              </div>
          </Grid>
      </Grid> 
    </div>
  );
}

export default History;