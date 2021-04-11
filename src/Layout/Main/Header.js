import React, { 
  useContext
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Tooltip
} from '@material-ui/core';
import { APP_NAV_WIDTH } from '../../Setting/env';
import { Menu as MenuIcon, PowerSettingsNew } from '@material-ui/icons';
import { USER } from '../../Setting/env';
import { AuthContext } from '../../Service/Context/AuthContext';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  app_bar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${APP_NAV_WIDTH}px)`,
      marginLeft: APP_NAV_WIDTH,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  app_toolbar_content: {
    width: '100%',
    padding: '0px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Header = ({drawerHandleToogle}) => {
    const { logout } = useContext(AuthContext);
    const history = useHistory();
    const classes = useStyles();

    const handleLogout = () => {
      logout();
      history.push("/");
    }

    return (
      <AppBar position="fixed" className={classes.app_bar}>
        <Toolbar className={classes.app_toolbar_content}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={drawerHandleToogle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <Typography variant="h6" noWrap>
              Tester Recruitment
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" noWrap>
              { USER ? USER.name : `Username`}
            </Typography>
            <Tooltip title="Logout">
              <IconButton 
                aria-label="logout" 
                size="medium" 
                className={classes.margin}
                onClick={handleLogout}
              >
                <PowerSettingsNew />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    )
};

export default Header;