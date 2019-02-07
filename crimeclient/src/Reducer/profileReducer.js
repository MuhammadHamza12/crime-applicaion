import * as actionTypes from '../Actions/actionTypes';
const defaultDataOBJ={
    crimeReportCount : null,
    complaintsReportCount: null,
    missingReportCount:null,
}
export default function signupReducer(state=[defaultDataOBJ],action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
    
        case actionTypes.SET_REPORT_COUNTER :
        return {
            crimeReportCount : action.payload.cRCount,
            complaintsReportCount: action.payload.comRCount,
            missingReportCount: action.payload.mRCount,
        };
        
       
        default:
        return newState;     
        // console.log('unknown case')
    }
    return newState;
    
}

 