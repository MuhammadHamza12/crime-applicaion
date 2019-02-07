import * as actionTypes from '../actionTypes';
import axios from 'axios';

function setAllReportsToRedux(allData) {
    return{
        type:actionTypes.SET_MISSING_REPORTS , payload:allData,
    }
}
function setAllUserMissingReportToRedux(allData) {
    return{
        type:actionTypes.SET_ALL_USER_MISS_REPORTS , payload:allData,
    }
}
export function getAllUserMissingData(url)
{
    return dispatch => {
        return axios.get(url).then(res=>{
            console.log('action creator response ', res);
            console.log(res.data.data);
            dispatch(setAllUserMissingReportToRedux(res.data.data));
        })
    }
}

export function getAllReportData(url,data) {
    return dispatch =>{
        return axios.post(url,data).then(res => {
            console.log(' action creator response: ',res);  
            console.log(res.data.data); 
            dispatch(setAllReportsToRedux(res.data.data)) 
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

