import * as actionTypes from '../actionTypes';
import axios from 'axios';
export function setAllCrimeReportsToRedux(allData) {
    return{
        type:actionTypes.SET_CRIME_REPORTS , payload:allData,
    }
}
export function setAllUserCrimeReportsToRedux(allData) {
    return{
        type: actionTypes.SET_ALL_USER_CRIME_REPORTS , payload:allData,
    }
}
export function getAllUserCrimeReportData(url) {
    return dispatch =>{
        return axios.get(url).then((res)=>{
            console.log('action create response ', res);
            console.log(res.data.data);
            dispatch(setAllUserCrimeReportsToRedux(res.data.data));
        })
    }
}
export function getAllCrimeReportData(url,data) {
    return dispatch =>{
        return axios.post(url,data).then(res =>{
            console.log(' action creator response: ',res);  
            console.log(res.data.data); 
            
            // console.log(country,description)
           dispatch(setAllCrimeReportsToRedux(res.data.data)) 
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
