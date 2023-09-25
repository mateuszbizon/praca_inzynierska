import * as actionTypes from "../constants/actionTypes";

export default (state = { tutorials: [], tutorial: {}, message: "", success: null }, action) => {
    switch (action.type) {
      case actionTypes.CREATE_TUTORIAL:
        return { ...state, tutorials: [...state.tutorials, action.payload] };

      case actionTypes.GET_TUTORIALS_BY_USERNAME:
        return { ...state, tutorials: action.payload }

      case actionTypes.DELETE_TUTORIAL_BY_ID:
        return { ...state, tutorials: state.tutorials.filter(tutorial => tutorial._id !== action.payload) }

      case actionTypes.GET_TUTORIAL_BY_ID:
        return { ...state, tutorial: action.payload, success: true }

      case actionTypes.GET_TUTORIAL_BY_ID_FAIL:
        return { ...state, message: action.payload, success: false }

      case actionTypes.UPDATE_TUTORIAL:
        return { ...state, tutorial: action.payload }
        
      default:
        return state;
    }
};