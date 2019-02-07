import axios from 'axios';
import * as actionTypes from '../actionTypes';

function setAllUserComplaintReportsToRedux(allData) {
    debugger;
    return {
        type:actionTypes.SET_ALL_USER_COMPLAINT_REPORTS , payload: allData,
    }
}
function setALLComplaintToRedux(allData) {
    return{
        type:actionTypes.SET_COMPLAINT_REPORTS , payload:allData,
    }
}
export function getAllUserComplaintReportData(url) {
    return dispatch =>{
        return axios.get(url).then((res)=>{
            console.log('action create response ', res);
            console.log(res.data.data);
            dispatch(setAllUserComplaintReportsToRedux(res.data.data));
        })
    }
}

export function getAllReportData(url,data) {
    return dispatch =>{
        return axios.post(url,data).then(res => {
            console.log(' action creator response: ',res);  
            console.log(res.data.data); 
            dispatch(setALLComplaintToRedux(res.data.data)) 
        })
    }
}
export function postStatusData(url,data) {
    return dispatch => {
        return axios.put(url,data).then(res=>{
            console.log('action creator response: ',res);
            console.log(res.data.data);    
        })
    }
}