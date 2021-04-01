import React from 'react';
import {
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon , 
  ListItemText,
  makeStyles,
  Divider,
  Hidden
} from '@material-ui/core';
import { Home as HomeIcon, Receipt, AssignmentInd, Build, RecentActors, Motorcycle, MenuBook, Payment, FindInPage } from '@material-ui/icons';
import { APP_NAV_WIDTH } from '../../Setting/env';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

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
    backgroundColor: theme.palette.warning.main,
    color: 'white'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  
}));

const Admin = ({drawerTheme,drawerContainer,drawerHandleToogle,mobileOpen}) => {
  const classes = useStyles();
  const history = useHistory();

  const main_menu = [
    {
      text : 'Home',
      location : '/home',
      icon : <HomeIcon className={classes.root} />
    },
    {
      text : 'User',
      location : '/users',
      icon : <AssignmentInd className={classes.root} />
    },
  ];
  
  const setting_menu = [
    {
      text : 'Jenis Pengeluaran',
      location : '/outcome-types',
      icon : <Build className={classes.root} />
    },
    {
      text : 'Vendor',
      location : '/vendors',
      icon : <RecentActors className={classes.root} />
    },
    {
      text : 'Ekspedisi',
      location : '/expeditions',
      icon : <Motorcycle className={classes.root} />
    },
  ];
  
  const income_menu = [
    {
      text : 'Pendapatan Ekspedisi',
      location : '/orders',
      icon : <Payment className={classes.root} />
    },
  ];
  
  const outcome_menu = [
    {
      text : 'Pengeluaran Internal',
      location : '/outcomes',
      icon : <Receipt className={classes.root} />
    },
  ];
  
  const report_menu = [
    {
      text : 'Report',
      location : '/reports',
      icon : <MenuBook className={classes.root} />
    },
    {
      text : 'History',
      location : '/histories',
      icon : <FindInPage className={classes.root} />
    },
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          {main_menu.map((item, index) => (
            <ListItem button key={index} onClick={() => item.location === null ? toast.error("under maintenance") : history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {setting_menu.map((item, index) => (
            <ListItem button key={index} onClick={() => item.location === null ? toast.error("under maintenance") : history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {income_menu.map((item, index) => (
            <ListItem button key={index} onClick={() => item.location === null ? toast.error("under maintenance") : history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {outcome_menu.map((item, index) => (
            <ListItem button key={index} onClick={() => item.location === null ? toast.error("under maintenance") : history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {report_menu.map((item, index) => (
            <ListItem button key={index} onClick={() => item.location === null ? toast.error("under maintenance") : history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
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