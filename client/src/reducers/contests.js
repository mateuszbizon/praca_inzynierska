import * as actionTypes from "../constants/actionTypes";

export default (state = { contests: [], endContests: [] }, action) => {
    switch (action.type) {
      case actionTypes.CREATE_CONTEST:
        return { ...state, contests: [...state.contests, action.payload] };
        
      default:
        return state;
    }
};