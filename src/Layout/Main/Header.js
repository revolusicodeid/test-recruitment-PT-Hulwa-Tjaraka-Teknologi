import React, { 
  useContext,
  useState,
  useEffect
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
import { PowerSettingsNew } from '@material-ui/icons';
import { getRequestLess } from '../../Service/Request/FormRequest';
import { API_URL } from '../../Setting/env';
import { ProgressContext } from "../../Service/Context/ProgressContext";
import { AuthContext } from '../../Service/Context/AuthContext';
import { useHistory } from 'react-router';
import { Menu as MenuIcon } from '@material-ui/icons';

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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Header = ({drawerHandleToogle}) => {
    const { setShowProgress } = useContext(ProgressContext);
    const { token, logout } = useContext(AuthContext);
    const history = useHistory();
    const url = `${API_URL}/get-user`;
    const classes = useStyles();
    const [data_request, setDataRequest] = useState(null);

    const handleLogout = () => {
      logout();
      history.push("/");
    }

    useEffect(() => {
      const fetchData = async () => {
        const result = await getRequestLess(url,null,true,setShowProgress,token).then(res=>{
          return res;
        });
        setDataRequest(result);
      };
      setShowProgress(true);
      fetchData();
    }, [url,setShowProgress,token]);

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
              Aplikasi Ekspedisi
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" noWrap>
              { data_request ? data_request.data.name : `Username`}
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