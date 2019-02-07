import * as actionTypes from '../actionTypes';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../webToken/setAuthorizationToken';
import { setCurrentUser } from '../setCurrentUser/setCurrentUser';
import { stat } from 'fs';
import config from '../../config';
export function checkTokenStatus(){
    return dispatch => {
       const token = localStorage.getItem('jwtToken');
       if(!token){
           return 'no token detected!';
       }
       const options = {
        method:'POST',
        headers:{
            "Content-Type":"application/json"},
            data:JSON.stringify({data:token}),
            url:`${config.port}/api/checkToken`,
        }
        axios(options)
        .then((res)=>{
            
                console.log('response: '+res.data);
                   
              
        })
        .catch((err)=>{
            debugger;
            try{
            console.log(err.response.data)
            const  { error , status} = err.response.data;
            console.log(status,error)
            localStorage.removeItem('jwtToken');
            setAuthorizationToken(status);
            dispatch(setCurrentUser({}));
            debugger;
                
          
        }
        catch(e){
            console.log('error', e);
        }
        })
        // localStorage.removeItem('jwtToken');
        // setAuthorizationToken(false);
        // dispatch(setCurrentUser({}));
    }
}
