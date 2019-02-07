import * as actionTypes from '../Actions/actionTypes';

export default function crimereportReducer(state=[],action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
    
        case actionTypes.SET_CRIME_REPORTS:
        return action.payload;
        
       case actionTypes.SET_ALL_USER_CRIME_REPORTS:
       return action.payload;

        default:
        return newState;     
        // console.log('unknown case')
    }
    return newState;
    
}

 