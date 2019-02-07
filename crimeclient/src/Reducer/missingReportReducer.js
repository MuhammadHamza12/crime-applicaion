import * as actionTypes from '../Actions/actionTypes';

export default function missingreportReducer(state=[],action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
    
        case actionTypes.SET_MISSING_REPORTS:
        return action.payload;
        
        case actionTypes.SET_ALL_USER_MISS_REPORTS:
        return action.payload;
       
        default:
        return newState;     
        // console.log('unknown case')
    }
    return newState;
    
}

 