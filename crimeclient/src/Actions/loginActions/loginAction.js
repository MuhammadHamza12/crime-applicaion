import * as actionTypes from '../actionTypes';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../webToken/setAuthorizationToken';
import { setCurrentUser } from '../setCurrentUser/setCurrentUser';
import config from '../../config';
export function logout(){
    debugger;
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function Login(data) {
    debugger;
    return dispatch => { 
     return axios.post(`${config.port}/api/auth` , data).then(res =>{
     console.log("response: "+res)    
     const token = res.data.token;
         console.log('token data: '+res.data);
         console.log(token)
         localStorage.setItem('jwtToken',token);
         setAuthorizationToken(token);
         console.log(jwt.decode(token));
        dispatch(setCurrentUser(jwt.decode(token)));  
      }); 
 }
}
export function facebookLogin(data) {
    debugger;
    return dispatch =>{
        return axios.post(`${config.port}/auth/authFacebook`,data).then(res =>{
            console.log('response ', res);
            const token=res.data.token;
            console.log('token data: ' , res.data);
            localStorage.setItem('jwtToken',token);
            setAuthorizationToken(token);
            console.log(jwt.decode(token));
            dispatch(setCurrentUser(jwt.decode(token)));
        })
    }
}
export function commonLogin(url,data) {
    debugger;
    return dispatch =>{
        return axios.post(url,data).then(res =>{
            console.log('response: ',res);
            const token = res.data.token;
            console.log('token data: ',res.data);
            localStorage.setItem('jwtToken',token);
            setAuthorizationToken(token);
            console.log(jwt.decode(token));
            debugger;
            dispatch(setCurrentUser(jwt.decode(token)));
        })
    }
}
export function googleLogin(data) {
    debugger;
    return dispatch =>{
        return axios.post(`${config.port}/auth/authGoogle` ,data).then(res =>{
            console.log('response: ', res);
            const token=res.data.token;
            console.log('token data: ', res.data);
            console.log(token);
            localStorage.setItem('jwtToken',token);
            setAuthorizationToken(token);
            console.log(jwt.decode(token));
            dispatch(setCurrentUser(jwt.decode(token)));
        })
    }
}