import * as actionTypes from '../Actions/actionTypes';
const defaultDataOBJ={
    username : '',
    email: '',
}
export default function signupReducer(state=[defaultDataOBJ],action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
    
        case actionTypes.USER_SIGN_UP :
        return [...state , {
            username : action.payload.username,
            email : action.payload.email,
        }];
        
       
        default:
        return newState;     
        // console.log('unknown case')
    }
    return newState;
    
}

 