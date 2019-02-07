import * as actionTypes from '../actionTypes';

export function flashMessage(message) {
    
    return {
        type : actionTypes.FLASH_MASSAGE,
        payload: message,
    }
}
