import * as actionTypes from '../actionTypes';

export function setCurrentUser(userDetails) {
    
  return {
      type: actionTypes.SET_CURRENT_USER , payload: userDetails
  }
}