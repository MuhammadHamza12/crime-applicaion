import * as actionTypes from '../Actions/actionTypes';
import isEmpty from 'lodash/isEmpty';
import { isNull } from 'lodash';
const defaultState ={
    isAuth:false,
    users:{},
    isAdmin:'commonUser',
}

export default function setUserReducer(state=defaultState,action={}) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:   
        debugger;
        return{ 
            isAuth:!isEmpty(action.payload),
            users:action.payload,
            } 
            
        default:
            return state;
    }
}
