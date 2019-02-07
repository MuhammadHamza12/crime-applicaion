import * as actionTypes from '../Actions/actionTypes';
import shortid from 'shortid';

export default function flashReducers(state={},action) {
    switch (action.type) {
        
        case actionTypes.FLASH_MASSAGE:     
        
        return {
                id:shortid.generate(),
                type: action.payload.type,
                text: action.payload.text
            }
    
        default:
        return state;
    }
}