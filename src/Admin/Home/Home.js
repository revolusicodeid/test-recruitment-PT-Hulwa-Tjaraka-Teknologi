import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid, 
  Typography 
} from '@material-ui/core';
import BenefitChart from './BenefitChart';
import { TOKEN } from '../../Setting/env';

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
}));

const Home = () => {
  const classes = useStyles();
 
  const data_chart = [
      {
        label : "Pendapatan (55%)",
        bg_color : "#2a9d8f",
        ho_color : "#264653",
        data_val : 13000000,
      },
      {
        label : "Pengeluaran (45%)",
        bg_color : "#e76f51",
        ho_color : "#264653",
        data_val : 11000000,
      }
    ];

  useEffect(() => {
    const refreshPage = ()=>{
      window.location.reload();
    }
    if(TOKEN){
      console.log(TOKEN);
    } else {
      refreshPage();
    }
  }, [TOKEN]);
 
  return (
    <div className={classes.content}>
      <Grid container direction={'column'} spacing={3}>
          <Grid xs={12} className={classes.content_header} spacing={1}>
            <Typography variant="subtitle1" noWrap>
              Home
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4} >
              <BenefitChart data={data_chart} />
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
              vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
              hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
              tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
              nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
              accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
          </Grid>
      </Grid>        
    </div>
  );
}

export default Home;