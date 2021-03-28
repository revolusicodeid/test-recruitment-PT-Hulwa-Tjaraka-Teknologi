import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, CssBaseline, useTheme } from '@material-ui/core';
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

function Content ({window,Layout}) {
  console.log(window);
  const container = window !== undefined ? () => window().document.body : undefined;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.container}>
        <CssBaseline />
        <Header drawerHandleToogle={handleDrawerToggle} />
        <Admin drawerTheme={theme} drawerContainer={container} drawerHandleToogle={handleDrawerToggle} mobileOpen={mobileOpen}/>
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <Layout />
        </div>
    </div>
  );
}


Content.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Content;