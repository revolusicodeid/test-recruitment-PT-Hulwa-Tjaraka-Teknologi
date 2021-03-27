import React from 'react';
import {
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon , 
  ListItemText,
  makeStyles,
  Divider
} from '@material-ui/core';
import { Home as HomeIcon, Receipt, AssignmentInd, Build, RecentActors, Motorcycle, MenuBook, Payment, FindInPage } from '@material-ui/icons';
import { APP_NAV_WIDTH } from '../../Setting/env';
import { useHistory } from 'react-router';

const useStyles = makeStyles( (theme) => ({
  root: {
    color: 'white',
  },
  drawer : {
    width: APP_NAV_WIDTH,
    flexShrink: 0,
  },
  drawer_paper: {
    width: APP_NAV_WIDTH,
    background: theme.palette.warning.main
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  
}));

const Admin = () => {
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
      location : '/outcome_categories',
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

  return (
    <Drawer 
      className={classes.drawer} 
      variant="permanent"
      classes={{
        paper: classes.drawer_paper,
      }}
      >
      <div className={classes.toolbar} />
      <div className={classes.root}>
        <List>
          {main_menu.map((item, index) => (
            <ListItem button key={index} onClick={() => history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {setting_menu.map((item, index) => (
            <ListItem button key={index} onClick={() => history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {income_menu.map((item, index) => (
            <ListItem button key={index} onClick={() => history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {outcome_menu.map((item, index) => (
            <ListItem button key={index} onClick={() => history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {report_menu.map((item, index) => (
            <ListItem button key={index} onClick={() => history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default Admin;