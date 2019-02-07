import axios from 'axios';
import * as ActionTypes from '../actionTypes';

export function profileCountData(countData){
    
    return {
      type: ActionTypes.SET_REPORT_COUNTER ,payload:countData,
  }
}
export function countDataEnteries(url,data,) {
    return dispatch =>{
        return axios.post(url,data).then(res =>{
            console.log(' action creator response: ',res);
       const {totalcRModal,totalcomRModal,totalmissRModal} = res.data.data;
       const reqData = {
        cRCount:totalcRModal,
        comRCount:totalcomRModal,
        mRCount:totalmissRModal,
      }
      dispatch(profileCountData(reqData));
        })
    }
}
