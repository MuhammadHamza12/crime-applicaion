import axios from 'axios';
export function postCrimeDataToServer(url,data) {
    return dispatch =>{
        return axios.post(url,data).then(res =>{
            console.log(' action creator response: ',res);
        })
    }
}
