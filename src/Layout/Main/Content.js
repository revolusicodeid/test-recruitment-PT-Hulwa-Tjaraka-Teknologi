import React from 'react';
import { makeStyles, CssBaseline } from '@material-ui/core';
import Admin from "../../Layout/Main/Admin";
import Header from "../../Layout/Main/Header";

const useStyles = makeStyles((theme) => ({
  container : {
    display: 'flex',
  },
  content: {
    color: 'inherit',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    width: '80%'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const Content = ({Layout}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
        <CssBaseline />
        <Header />
        <Admin />
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <Layout />
        </div>
    </div>
  );
}

export default Content;