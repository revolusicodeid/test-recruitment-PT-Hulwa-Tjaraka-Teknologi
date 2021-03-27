import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BenefitChart from './BenefitChart';

const useStyles = makeStyles((theme) => ({
  content: {
    color: 'inherit',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  content_header: {
    background: '#2c2c2c',
    color: '#e9e9e9',
    padding: '0.5rem 1rem',
  },
  chart: {
    width : 'auto',
    display: 'flex',
    flexWrap: 'wrap'
  },
}));

const Home = () => {
  const classes = useStyles();
  const data_chart = [
      {
        label : "Pendapatan",
        bg_color : "#2a9d8f",
        ho_color : "#264653",
        data_val : 13000000
      },
      {
        label : "Pengeluaran",
        bg_color : "#e76f51",
        ho_color : "#264653",
        data_val : 11000000
      }
    ];
  return (
    <div className={classes.content}>
        <div className={classes.content_header}>
          <h1>Home</h1>
        </div>
        <div className={classes.chart}>
          <BenefitChart data={data_chart} />
        </div>
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
    </div>
  );
}

export default Home;