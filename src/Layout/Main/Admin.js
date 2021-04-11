import React from 'react';
import {
  Drawer, 
  makeStyles,
  Hidden
} from '@material-ui/core';
import { Home as HomeIcon, RecentActors, Build } from '@material-ui/icons';
import { APP_NAV_WIDTH, USER } from '../../Setting/env';

import MenusList from './MenusList';

const useStyles = makeStyles( (theme) => ({
  root: {
    color: 'white',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: APP_NAV_WIDTH,
      flexShrink: 0,
    },
  },
  drawer_paper: {
    width: APP_NAV_WIDTH,
    backgroundColor: "#e76f51",
    color: 'white'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  
}));

const Admin = ({drawerTheme,drawerContainer,drawerHandleToogle,mobileOpen}) => {
  const classes = useStyles();
  const accsess = USER.accessrole;

  const main_menu = [
    {
      text : 'dashboard',
      menu : [
        {
          text : 'kpi',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.dashboard.kpi
        },
      ]
    },
    {
      text : 'hrd',
      menu : [
        {
          text : 'setup',
          location : '/hrd/setup',
          icon : <Build className={classes.root} />,
          access : accsess.hrd.setup.list
        },
        {
          text : 'karyawan',
          location : '/hrd/karyawan',
          icon : <RecentActors className={classes.root} />,
          access : accsess.hrd.karyawan.list
        },
        {
          text : 'payroll',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.hrd.payroll.list
        },
      ]
    },
    {
      text : 'crm',
      menu : [
        {
          text : 'setup',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.crm.setup.list
        },
        {
          text : 'request',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.crm.request.list
        },
        {
          text : 'survey',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.crm.survey.list
        },
        {
          text : 'instalasi',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.crm.instalasi.list
        },
      ]
    },
    {
      text : 'procurement',
      menu : [
        {
          text : 'stock',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.procurement.stock.list
        },
      ]
    },
    {
      text : 'document',
      menu : [
        {
          text : 'form',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.document.form.list
        },
        {
          text : 'nodin',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.document.nodin.list
        },
        {
          text : 'suratmasuk',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.document.suratmasuk.list
        },
        {
          text : 'suratkeluar',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.document.suratkeluar.list
        },
      ]
    },
    {
      text : 'master',
      menu : [
        {
          text : 'paket',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.master.paket.list
        },
        {
          text : 'kost',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.master.kost.list
        },
      ]
    },
    {
      text : 'user',
      menu : [
        {
          text : 'role',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.user.role.list
        },
        {
          text : 'log',
          location : '/home',
          icon : <HomeIcon className={classes.root} />,
          access : accsess.user.log
        },
      ]
    },
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {<MenusList data={main_menu} />}
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={drawerContainer}
          variant="temporary"
          anchor={drawerTheme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={drawerHandleToogle}
          classes={{
            paper: classes.drawer_paper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawer_paper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Admin;