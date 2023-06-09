import * as actionTypes from "../constants/actionTypes";

export default (state = { isBadRequest: false, badMessage: "" }, action) => {
    switch (action.type) {
      case actionTypes.BAD_REQUEST_FALSE:
        return { ...state, isBadRequest: false, badMessage: "" };

      case actionTypes.BAD_REQUEST_TRUE:
        return { ...state, isBadRequest: true, badMessage: action.payload }
        
      default:
        return state;
    }
};