import { combineReducers } from 'redux';
import signup from '../signupReducer';
import flashmsg from '../flashReducer';
import setuser from '../setUserReducer';
import setRCount from '../profileReducer';
import setARRecord from '../crimeReportReduer';
import setMRRecord from '../missingReportReducer';
import setCRRecord from '../complaintReportReducer';
const rootReducer = combineReducers({
    signup , flashmsg , setuser ,setRCount,setARRecord , setMRRecord,setCRRecord,
});

export default rootReducer;