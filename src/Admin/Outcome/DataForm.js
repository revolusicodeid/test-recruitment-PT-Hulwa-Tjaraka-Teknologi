import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import { 
    makeStyles, 
    Button, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    TextField, 
    Select,
    Paper,
    CssBaseline,
    Grid,
    Typography,
    Box 
} from '@material-ui/core';
import LuxonUtils from '@date-io/luxon';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { CloudUpload } from '@material-ui/icons';
import { API_URL } from '../../Setting/env';
import { postRequestFormData, formatData } from '../../Service/Request/FormRequest';
import { toast } from 'react-toastify';
import { ProgressContext } from "../../Service/Context/ProgressContext";
import DropdownTreeSelect from "react-dropdown-tree-select";
import 'react-dropdown-tree-select/dist/styles.css'
import "./index.css";
import dataJson from "./data.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
  },
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
  },
  button: {
    margin: theme.spacing(1),
    height: '3rem'
  },
  paper: {
    width: '100%',
    padding: theme.spacing(3),
  },
  control: {
    width: 'auto',
    minWidth:'200px',
    padding: theme.spacing(3),
  },
  content_header: {
    background: '#2c2c2c',
    color: '#e9e9e9',
    padding: '0.5rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function DetailOutcome(props) {
    const {classes, selectedNode, handleInputOnChange} = props;
    
    const select_items = [
        {
            text: 'Cash',
            val: 'cash'
        },
        {
            text: 'Kredit',
            val: 'kredit'
        },
    ];

    const [selectedDate, handleDateChange] = useState(new Date());
    

    return (
        <Grid key={selectedNode.label} item xs={4}>
            <Paper className={classes.control}>
                <div className={classes.content_header}>
                  <Typography variant="h6" gutterBottom component="div">
                    {selectedNode.label}
                  </Typography>
                </div>

                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <KeyboardDatePicker
                      required
                      margin="normal"
                      id="date-picker-dialog"
                      label="Tanggal Pembayaran"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                </MuiPickersUtilsProvider>

                <TextField
                  required
                  fullWidth
                  className={classes.formControl}
                  margin="normal"
                  id="amount_detail"
                  label="Amount"
                  variant="outlined"
                  name="amount_detail[]"
                  type="number"
                  onChange={handleInputOnChange}
                />

                <TextField
                  required
                  fullWidth
                  className={classes.formControl}
                  margin="normal"
                  id="price_detail"
                  label="Harga"
                  variant="outlined"
                  name="price_detail[]"
                  type="number"
                  onChange={handleInputOnChange}
                />

                <FormControl fullWidth variant="outlined" className={classes.formControl} margin="normal" >
                  <InputLabel id="demo-simple-select-outlined-label">Jenis Pembayaran*</InputLabel>

                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Jenis Pembayaran"
                      name="payment_types[]"
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
            </Paper>
        </Grid>
    );
}

DetailOutcome.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedNode: PropTypes.object.isRequired,
  handleInputOnChange: PropTypes.func.isRequired,
};
 
const DataForm = (view) => {
    const { setShowProgress } = useContext(ProgressContext);
    const {setViewform} = view;
    const classes = useStyles();
    const [data_select, setDataSelect] = useState();
    const [template_render, setTemplateRender] = useState([]);
    const [data_input, setDataInput] = useState({
      data : {
          code: "",
          name : "",
      }
    });

    const handleSelectOnChange = (currentNode, selectedNodes) => {
      console.log(selectedNodes);
      selectedNodes.map(node => {
          setTemplateRender(prevState => (
              [...prevState, <DetailOutcome classes={classes} selectedNode={node} handleInputOnChange={handleInputOnChange} />]
          ));
      });
    };

    const handleInputOnChange = (e) => {
        formatData(e,setDataInput);
      
    }

    const handleSubmit = () => {
        const url = `${API_URL}/outcome-types`;
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

    useEffect(() => {
        const assignObjectPaths = (obj, stack) => {
          Object.keys(obj).forEach(k => {
            const node = obj[k];
            if (typeof node === "object") {
              node.path = stack ? `${stack}.${k}` : k;
              assignObjectPaths(node, node.path);
            }
          });
        };
        assignObjectPaths(dataJson);
        setDataSelect(dataJson);
      }, [dataJson]);
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
            
            <TextField
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="amount"
              label="Total Amount"
              variant="outlined"
              name="amount"
              disabled
              onChange={handleInputOnChange}
            />
            
            <TextField
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="price"
              label="Total Price"
              variant="outlined"
              name="price"
              disabled
              onChange={handleInputOnChange}
            />

            {
                data_select ? 
                <DropdownTreeSelect 
                    data={data_select} 
                    onChange={handleSelectOnChange} 
                    className="mdl-demo" 
                /> : ""
            }

          </div>
        </div>
      </Paper>
      
      <div className={classes.form}>            
          <div className={classes.form_body} noValidate>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid container item spacing={3}>
                  {
                      template_render.map(row => row)
                  }
                  </Grid>
              </Grid>
            </Box>
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
      </React.Fragment>
    )
  }
 
export default DataForm;