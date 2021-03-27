import React, {useState, useContext} from 'react'
import { 
    makeStyles, 
    Button, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select,
    Paper
} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import {DropzoneArea} from 'material-ui-dropzone';
import { API_URL } from '../../Setting/env';
import { postRequestFormData } from '../../Service/Request/FormRequest';
import { toast } from 'react-toastify';
import { ProgressContext } from "../../Service/Context/ProgressContext";

const useStyles = makeStyles((theme) => ({
  form : {
    padding: '0 0',
    margin: '0 0',
    display: 'flex',
    justifyContent: 'space-between',
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
  drop_zone_area : {
    width: '70%',
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
 
const DataForm = (data) => {
  const { setShowProgress } = useContext(ProgressContext);
    const {setViewform} = data;
    const classes = useStyles();
    const [data_input, setDataInput] = useState({
        data : {
            file: [],
            expeditions_id : ''
        }
    });
    const select_items = [
        {
            text: 'JNE',
            val: 1
        },
        {
            text: 'JNT',
            val: 2
        },
        {
            text: 'Wahana',
            val: 3
        }
    ];

    const handleDropChange = (e) => {
        setDataInput(prevState => ({
            data: { ...prevState.data,  file: e[0] }
        }));
    }

    const handleInputOnChange = (e) => {
        const val = e.target.value
        setDataInput(prevState => ({
            data: { ...prevState.data,  expeditions_id: val }
        }));
        
    }
    const handleOnSubmit = (e) => {
        const url = `${API_URL}/orders/import`;
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
      <Paper className={classes.paper}>
        <div className={classes.form}>
            <div className={classes.drop_zone_area}>
              <DropzoneArea
                onChange={handleDropChange}
                filesLimit="1"
                dropzoneText="Accepted file .csv"
              />
            </div>
            
            <div className={classes.form_body}>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Ekspedisi</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={data_input.data.ekspedisi}
                    label="Ekspedisi"
                    name="expeditions_id"
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
                  onClick={handleOnSubmit}
                >
                  Submit
                </Button>
            </div>
        </div>
      </Paper>
    )
  }
 
export default DataForm;