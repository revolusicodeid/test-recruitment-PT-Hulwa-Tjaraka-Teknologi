import React from 'react';
import { 
    makeStyles, 
    Grid,
    Typography,
    Box, 
    Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
  },
  form : {
    padding: '0 0',
    margin: '0 0',
    display: 'flex',
    justifyContent: 'center',
  },
  form_body: {
    padding: '0.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
    height: '3rem'
  },
  paper: {
    width: '100%',
    padding: theme.spacing(3),
  },
  control: {
    width: 'auto',
    minWidth:'200px',
    padding: theme.spacing(3),
  },
}));
 
const Summary = () => {
    const classes = useStyles();
    return (
      <React.Fragment>
      <div className={classes.form}>            
          <div className={classes.form_body} noValidate>
            <Paper className={classes.paper}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    <Grid container item spacing={3}>
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom component="div">
                              Total Pengeluaran:
                            </Typography>
                            <Typography variant="p" gutterBottom component="div">
                              Rp. 13.000.000,00
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom component="div">
                              Total Pendapatan: 
                            </Typography>
                            <Typography variant="p" gutterBottom component="div">
                              Rp. 10.000.000,00
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" gutterBottom component="div">
                              Balance:
                            </Typography>
                            <Typography variant="p" gutterBottom component="div">
                              - Rp. 3.000.000,00
                            </Typography>
                        </Grid>  
                    </Grid>
                  </Grid>
                </Box>
            </Paper>
          </div>
      </div>
      </React.Fragment>
    )
  }
 
export default Summary;