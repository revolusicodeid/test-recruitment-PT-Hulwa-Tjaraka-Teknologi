import React, {useState, useContext, useEffect} from 'react'
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
    TextareaAutosize,
    Grid
} from '@material-ui/core';
import LuxonUtils from '@date-io/luxon';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { CloudUpload } from '@material-ui/icons';
import { API_URL, USER } from '../../../Setting/env';
import { postRequestLess, formatData, getRequestLess } from '../../../Service/Request/FormRequest';
import { toast } from 'react-toastify';
import { ProgressContext } from "../../../Service/Context/ProgressContext";

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
    const {setViewForm, editData} = view;
    const classes = useStyles();
    const [divisi,setDivisi] = useState([]);
    const [jabatan,setJabatan] = useState([]);
    const [data_input, setDataInput] = useState({
      data : {
        nik : "",
        password : "",
        name : "",
        email : "",
        phone : "",
        role_id : "",
        tgl_lahir : "",
        no_ktp : "",
        no_npwp : "",
        no_rekening : "",
        status_pernikahan : "",
        pendidikan : "",
        mulai_bergabung : "",
        alamat : "",
        emergency_contact : "",
        no_bpjs_kesehatan : "",
        no_bpjs_ketenagakerjaan : "",
        divisi_id : "",
        jabatan_id : "",
        status_karyawan : "",
        pas_foto : "",
        file_kk : "",
        file_ktp : "",
        file_npwp : "",
        file_cv : "",
        file_psikotest : "",
        author : USER.karyawan_id,
      }
    });


    const role = [
        {
            text: 'Super Admin',
            val: 'ec6a5f55-8fe6-4fcc-8879-6e610458c74e'
        },
    ];

    const handleInputOnChange = (e) => {
        formatData(e,setDataInput);
    }

    const handleSubmit = () => {
        const url = `${API_URL}/user-service/user`;
        setShowProgress(true);
        editData.length > 0 ? postRequestLess(url,data_input.data,handlePostRequest,setShowProgress,true,null,"put") :
        postRequestLess(url,data_input.data,handlePostRequest,setShowProgress,true);
    }
    
    const handlePostRequest = (dataRequest) => {
      const {msg} = dataRequest;
      if(msg==="SUCCESS"){
        setViewForm(false);
        toast.success(msg);
      }else{
        toast.error(msg);
      }
    }

    useEffect(() => {
      const fetchData = async () => {
        const url_divisi = `${API_URL}/hrd-service/divisi/list/all`;
        const url_jabatan = `${API_URL}/hrd-service/jabatan/list/all`;        
        
        const result_divisi = await getRequestLess(url_divisi,null,true,setShowProgress).then(res=>{
          return res;
        });
        const result_jabatan = await getRequestLess(url_jabatan,null,true,setShowProgress).then(res=>{
          return res;
        });
        function createData(
          name,
          id,
          ) {
          return { 
            text : name,
            val : id,
          };
        }
        function createDataUser(
          name,
          id,
          ) {
          return { 
            text : name,
            val : id,
          };
        }
        const addData = (createData,scope=null) => {
          return function(item){
            const id = scope === 'divisi' ? item.divisi_id : item.jabatan_id;
            const val = createData(
              item.name,
              id,
            );
            return scope === 'divisi' ? setDivisi(prevState => ([
              ...prevState, val
            ])) : setJabatan(prevState => ([
              ...prevState, val
            ]));
          }
        };
        await result_divisi.divisi.map(addData(createData,'divisi'));
        await result_jabatan.jabatan.map(addData(createData,'jabatan'));

        const url_user = editData.length > 0 ? `${API_URL}/user-service/user/${editData[0]}` : "";
        if(editData.length > 0){
          const result_user = await getRequestLess(url_user,null,true,setShowProgress).then(res=>{
            return res;
          });
          setDataInput({
            data : {
              karyawan_id : result_user.karyawan_id,
              nik : result_user.nik,
              password : "",
              name : result_user.name,
              email : result_user.email,
              phone : result_user.phone,
              role_id : result_user.role.id,
              tgl_lahir : result_user.tgl_lahir,
              no_ktp : result_user.no_ktp,
              no_npwp : result_user.no_npwp,
              no_rekening : result_user.no_rekening,
              status_pernikahan : result_user.status_pernikahan,
              pendidikan : result_user.pendidikan,
              mulai_bergabung : result_user.mulai_bergabung,
              alamat : result_user.alamat,
              emergency_contact : result_user.emergency_contact,
              no_bpjs_kesehatan : result_user.no_bpjs_kesehatan,
              no_bpjs_ketenagakerjaan : result_user.no_bpjs_ketenagakerjaan,
              divisi_id : result_user.divisi.id,
              jabatan_id : result_user.jabatan.id,
              status_karyawan : result_user.status_karyawan,
              pas_foto : result_user.pas_foto,
              file_kk : result_user.file_kk,
              file_ktp : result_user.file_ktp,
              file_npwp : result_user.file_npwp,
              file_cv : result_user.file_cv,
              file_psikotest : result_user.file_psikotest,
              author : result_user.author.id,
            }
          });
        }
        
      };

      const fetchDataUser = async () => {
        
      }

      setShowProgress(true);
      fetchData();
      fetchDataUser();
      console.log(editData);
    }, [editData, setShowProgress]);

    return (
      <React.Fragment>
      <CssBaseline />
      <Paper className={classes.paper}>
        <div className={classes.form}>            
          <div className={classes.form_body} noValidate>
          <Grid 
          className={classes.content_header} 
          justify="space-between" 
          container spacing={1}
          >
            <Grid item xs={3} >
            <TextField
              required
              fullWidth
              autoFocus
              className={classes.formControl}
              margin="normal"
              id="nik"
              label="NIK"
              variant="outlined"
              name="nik"
              value={data_input.data.nik}
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
              value={data_input.data.password}
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
              value={data_input.data.name}
              onChange={handleInputOnChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={data_input.data.email}
              onChange={handleInputOnChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="phone"
              label="phone"
              variant="outlined"
              name="phone"
              value={data_input.data.phone}
              onChange={handleInputOnChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="no_ktp"
              label="no_ktp"
              variant="outlined"
              name="no_ktp"
              value={data_input.data.no_ktp}
              onChange={handleInputOnChange}
            />
            </Grid>
            <Grid item xs={3} >
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="no_npwp"
              label="no_npwp"
              variant="outlined"
              name="no_npwp"
              value={data_input.data.no_npwp}
              onChange={handleInputOnChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="no_rekening"
              label="no_rekening"
              variant="outlined"
              name="no_rekening"
              value={data_input.data.no_rekening}
              onChange={handleInputOnChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="status_pernikahan"
              label="status_pernikahan"
              variant="outlined"
              name="status_pernikahan"
              value={data_input.data.status_pernikahan}
              onChange={handleInputOnChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="pendidikan"
              label="pendidikan"
              variant="outlined"
              name="pendidikan"
              value={data_input.data.pendidikan}
              onChange={handleInputOnChange}
            />
            
            <TextareaAutosize
              rowsMax={5}
              rowsMin={5}
              className={classes.formControl}
              fullWidth
              id="alamat"
              label="Alamat"
              name="alamat"
              value={data_input.data.alamat}
              placeholder="Alamat"
              onChange={handleInputOnChange}
            />
            </Grid>
            <Grid item xs={3} >
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="emergency_contact"
              label="emergency_contact"
              variant="outlined"
              name="emergency_contact"
              value={data_input.data.emergency_contact}
              onChange={handleInputOnChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="no_bpjs_kesehatan"
              label="no_bpjs_kesehatan"
              variant="outlined"
              name="no_bpjs_kesehatan"
              value={data_input.data.no_bpjs_kesehatan}
              onChange={handleInputOnChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="no_bpjs_ketenagakerjaan"
              label="no_bpjs_ketenagakerjaan"
              variant="outlined"
              name="no_bpjs_ketenagakerjaan"
              value={data_input.data.no_bpjs_ketenagakerjaan}
              onChange={handleInputOnChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formControl}
              margin="normal"
              id="status_karyawan"
              label="status_karyawan"
              variant="outlined"
              name="status_karyawan"
              value={data_input.data.status_karyawan}
              onChange={handleInputOnChange}
            />
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <KeyboardDatePicker
                  fullWidth
                  className={classes.formControl}
                  required
                  margin="normal"
                  id="tgl_lahir"
                  label="tgl_lahir"
                  format="yyyy-M-d"
                  name="tgl_lahir"
                  inputValue={data_input.data.tgl_lahir}
                  onChange={(data,value) => setDataInput(prevState=>({data: {...prevState.data, ["tgl_lahir"] : value}}))}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
            </MuiPickersUtilsProvider>
            
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <KeyboardDatePicker
                  className={classes.formControl}
                  fullWidth
                  required
                  margin="normal"
                  id="mulai_bergabung"
                  label="mulai_bergabung"
                  format="yyyy-M-d"
                  name="mulai_bergabung"
                  inputValue={data_input.data.mulai_bergabung}
                  onChange={(data,value) => setDataInput(prevState=>({data: {...prevState.data, ["mulai_bergabung"] : value}}))}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
            </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3} >
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
              <InputLabel id="role_label">Role*</InputLabel>
              
              <Select
                  labelId="role_label"
                  id="role"
                  label="Role"
                  name="role_id"
                  value={data_input.data.role_id}
                  onChange={handleInputOnChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {role.map((item, index) => (
                      <MenuItem key={index} value={item.val}>{item.text}</MenuItem>
                  ))}
                </Select>
              
            </FormControl> 
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
              <InputLabel id="divisi_label">Divisi*</InputLabel>
              
                <Select
                  labelId="divisi_label"
                  id="divisi"
                  label="Divisi"
                  name="divisi_id"
                  value={data_input.data.divisi_id}
                  onChange={handleInputOnChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {divisi.map((item, index) => (
                      <MenuItem key={index} value={item.val}>{item.text}</MenuItem>
                  ))}
                </Select>
              
            </FormControl> 
            
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
              <InputLabel id="jabatan_label">Jabatan*</InputLabel>
              
                <Select
                  labelId="jabatan_label"
                  id="jabatan"
                  label="Jabatan"
                  name="jabatan_id"
                  value={data_input.data.jabatan_id}
                  onChange={handleInputOnChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {jabatan.map((item, index) => (
                      <MenuItem key={index} value={item.val}>{item.text}</MenuItem>
                  ))}
                </Select>
              
            </FormControl> 
            </Grid>
          </Grid>

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