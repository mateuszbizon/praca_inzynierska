import * as actionTypes from "../constants/actionTypes";

export default (state = { contests: [], contestsEnd: [] }, action) => {
    switch (action.type) {
      case actionTypes.CREATE_CONTEST:
        return { ...state, contests: [...state.contests, action.payload] };

      case actionTypes.GET_ALL_CONTESTS:
        return { ...state, contests: action.payload.contests, contestsEnd: action.payload.contestsEnd}
        
      default:
        return state;
    }
};