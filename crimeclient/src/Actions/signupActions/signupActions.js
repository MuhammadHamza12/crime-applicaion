import * as Actiontypes from '../actionTypes';
import * as serverActions from '../serverSideActions';
import axios from 'axios';
import setAuthorizationToken from '../../webToken/setAuthorizationToken';
import { setCurrentUser } from '../setCurrentUser/setCurrentUser';
import jwt from 'jsonwebtoken';
import config from '../../config';
export function signin(userDetails){
    return {
      type: Actiontypes.USER_SIGN_UP ,payload:userDetails
  }
}

export function signUpSaveToken(data){
    return dispatch => { 
        return axios.post(`${config.port}/api/signtoken` , data).then(res =>{
            const token = res.data.token;
            console.log(token)
            localStorage.setItem('jwtToken',token);
            setAuthorizationToken(token);
            console.log(jwt.decode(token));
           dispatch(setCurrentUser(jwt.decode(token)));
           }); 
    }
   }
export function signIn(userDetails) {
    return dispatch =>{
        serverActions.doPostRequest({
            url:'/api/users',
            data: userDetails
        })
        .then(success =>{
            debugger;
            dispatch({
                type:Actiontypes.USER_SIGN_UP,
                payload:success
            })
            console.log('object: '+success)
        });
        

    }
};

function LogIn(userDetails){
    return { type: Actiontypes.USER_LOGIN , payload:userDetails }
};
