import React, {useState, useContext} from 'react'
import { 
    makeStyles, 
    Button, 
    TextField, 
    Paper,
    CssBaseline
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
          code: "",
          name : "",
      }
    });

    const handleInputOnChange = (e) => {
        formatData(e,setDataInput);
      
    }

    const handleSubmit = () => {
        const url = `${API_URL}/vendors`;
        toast.error('undermaintenance');
        //setShowProgress(true);
        //postRequestFormData(url,data_input,handlePostRequest,setShowProgress);
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
      <React.Fragment>
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
              id="code"
              label="Code"
              variant="outlined"
              type="code"
              name="code"
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
      </React.Fragment>
    )
  }
 
export default DataForm;