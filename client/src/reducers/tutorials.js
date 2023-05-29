import * as actionTypes from "../constants/actionTypes";

export default (state = { tutorials: [] }, action) => {
    switch (action.type) {
      case actionTypes.CREATE_TUTORIAL:
        return { ...state, tutorials: [...state.tutorials, action.payload] };

      case actionTypes.GET_TUTORIALS_BY_USERNAME:
        return { ...state, tutorials: action.payload }
        
      default:
        return state;
    }
};