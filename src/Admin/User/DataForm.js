import React, {useState, useContext} from 'react'
import { 
    makeStyles, 
    Button, 
    FormControl, 
    InputLabel, 
    TextField, 
    MenuItem, 
    Select,
    Paper,
    CssBaseline,
    Container
} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { API_URL } from '../../Setting/env';
import { postRequestFormData, formatData } from '../../Service/Request/FormRequest';
import { toast } from 'react-toastify';
import { ProgressContext } from "../../Service/Context/ProgressContext";

const useStyles = makeStyles((theme) => ({
  form : {
    padding: '0 0',
    margin: '0 0',
    display: 'flex',
    justifyContent: 'center',
  },
  form_body: {
    padding: '0.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  button: {
    margin: theme.spacing(1),
    height: '3rem'
  },
  paper: {
    width: '100%',
    padding: theme.spacing(3),
  },
}));

 
const DataForm = (view) => {
    const { setShowProgress } = useContext(ProgressContext);
    const {setViewform} = view;
    const classes = useStyles();
    const [data_input, setDataInput] = useState({
      data : {
          email: "",
          name : "",
          password : "",
          role : "",
      }
    });


    const select_items = [
        {
            text: 'Admin',
            val: 'admin'
        },
        {
            text: 'Approval',
            val: 'approval'
        },
    ];

    const handleInputOnChange = (e) => {
      const val = e.target.value
      setDataInput(prevState => ({
          data: { ...prevState.data,  [e.target.name]: val }
      }));
      
    }

    const handleSubmit = () => {
        const url = `${API_URL}/users`;
        setShowProgress(true);
        postRequestFormData(url,data_input,handlePostRequest,setShowProgress);
    }
    
    const handlePostRequest = (dataRequest) => {
      const {status,message} = dataRequest;
      if(status){
        setViewform(false);
        toast.success(message);
      }else{
        toast.error(message);
      }
    }
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <div className={classes.form}>            
          <div className={classes.form_body} noValidate>
            <TextField
              required
              fullWidth
              autoFocus
              className={classes.formControl}
              margin="normal"
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              onChange={handleInputOnChange}
            />
            
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="name"
              label="Name"
              variant="outlined"
              name="name"
              onChange={handleInputOnChange}
            />
            
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              onChange={handleInputOnChange}
            />
            
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Role*</InputLabel>
              
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Role"
                  name="role"
                  onChange={handleInputOnChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {select_items.map((item, index) => (
                      <MenuItem key={index} value={item.val}>{item.text}</MenuItem>
                  ))}
                </Select>
              
            </FormControl> 
            
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<CloudUpload />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </Paper>
      </Container>
    )
  }
 
export default DataForm;