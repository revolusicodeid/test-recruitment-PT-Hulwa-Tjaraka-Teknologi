import axios from 'axios';
import { TOKEN } from '../../Setting/env';

export const formatData = (e,setPostData) => {
    let val = e.target.value;
    setPostData(prevState => ({
      data: { ...prevState.data,  [e.target.name]: val }
    }));
}

function formatFormData(data) {
    let form_data = new FormData();
    Object.entries(data.data).map(addData(form_data));
    return form_data;
}

function addData(form_data) {
  return function(item){
      return form_data.append(item[0],item[1]);
  }
}

export const timer = (setProgress) => {
  setInterval(() => {
    setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setTimeout(() => {
            setProgress(oldProgress);
          }, 400);
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);
}

function formDataHeaders() {
  return {
      'Authorization' : `Bearer ${TOKEN}`,
      'Content-Type': 'multipart/form-data',
  }
}

function lessHeaders(tokenManual) {
  return {
      'Authorization' : `Bearer ${tokenManual === null ? TOKEN : tokenManual}`,
      'Accept' : 'application/json, text/plain, */*'
  }
}

function noHeaders() {
  return {
      'Accept' : 'application/json, text/plain, */*'
  }
}

export function dummyDownload(setProgress=null){
  return axios({
    method: 'get', 
    url: "https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg",
    responseType: 'image/*',
    onDownloadProgress: progressEvent => {
      if(setProgress !==null ){
        const {loaded, total} = progressEvent;
        const percentage = Math.floor((loaded * 100) / total);
        progressEvent.lengthComputable ? setProgress(percentage) : timer(setProgress);
        if (percentage === 100) {
          setTimeout(() => {
            setProgress(percentage);
          }, 400);
        }
      }
      // do whatever you like with the percentage complete
      // maybe dispatch an action that will update a progress bar or something
    },
  })
  .then(function (response) {
      
  });
}

export const postRequest = (url,inputData,handleResult) => {
  axios.post(url, inputData).then(response => {
    const data = response.data;
    handleResult(data);
  });
}

export const getRequest = (url,handleResult,headers) => {
    axios({
      method: 'get', 
      url: url,
      responseType: 'application/json',
      headers : headers
    })
    .then(function (response) {
        const data = response.data;
        handleResult(data);
    });
}

export function getRequestLess(url,handleResult=null,with_token = false,setShowProgress=null, manual_token=null){
    return axios({
      method: 'get', 
      url: url,
      responseType: 'application/json',
      headers : with_token ? lessHeaders(manual_token) : noHeaders(),
    })
    .then(function (response) {
        const data = response.data;
        setShowProgress(false)
        if(handleResult === null){
          return data;
        }
        handleResult(data);
    });
}

export function postRequestLess(url,form_data,handleResult=null,setShowProgress=null,with_token = false){
    axios({
      method: 'post', 
      url: url,
      responseType: 'application/json',
      headers : with_token ? lessHeaders() : noHeaders(),
      data: form_data
    })
    .then(function (response) {
        const data = response.data;
        setShowProgress(false);
        if(handleResult === null){
          return data;
        }
        handleResult(data);
    });
}

export const postRequestFormData = (url,form_data,handleResult=null,setShowProgress=null) => {
    let post_data = formatFormData(form_data);
    axios({
      method: 'post', 
      url: url,
      responseType: 'application/json',
      headers : formDataHeaders(),
      data: post_data,
      //onUploadProgress: progressEvent => {
      //  if(setProgress !==null ){
      //    const {loaded, total} = progressEvent;
      //    const percentage = Math.floor((loaded * 100) / total);
      //    progressEvent.lengthComputable ? setProgress(percentage) : timer(setProgress);
      //    if (percentage === 100) {
      //      setTimeout(() => {
      //        setProgress(percentage);
      //      }, 400);
      //    }
      //  }
      //  // do whatever you like with the percentage complete
      //  // maybe dispatch an action that will update a progress bar or something
      //},
    })
    .then(function (response) {
        const data = response.data;
        setShowProgress(false);
        if(handleResult === null){
          return data;
        }
        handleResult(data);
    });
}

