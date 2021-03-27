import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { formatData, postRequestLess } from '../../Service/Request/FormRequest';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { API_URL } from '../../Setting/env';
import { ProgressContext } from "../../Service/Context/ProgressContext";
import { AuthContext } from '../../Service/Context/AuthContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Aplikasi Ekspedisi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initFormData = {
  data : {
      email : "",
      password : ""
  }
};

export default function SignIn() {
  const { setShowProgress } = useContext(ProgressContext);
  const { setIsAuthenticated, setToken } = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState(initFormData);

  const urlLogin = `${API_URL}/login`;
  
  const handleOnChangeInput = (e) => {
    formatData(e,setFormData);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setShowProgress(true);
    postRequestLess(urlLogin,formData.data,addToken,setShowProgress);
  }

  const addToken = (resData) => {
    const {status,data,message} = resData;
    if(status){
        localStorage.setItem("token",`${data}`);
        localStorage.setItem("isAuthenticated",true);
        setToken(`${data}`);
        setIsAuthenticated(true);
        toast.success("Welcome");
        history.push("/home");
    }else{
        toast.error(message);
        localStorage.clear();
    }
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.data.email}
            onChange={handleOnChangeInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.data.password}
            onChange={handleOnChangeInput}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleOnSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}