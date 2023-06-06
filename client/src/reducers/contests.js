import * as actionTypes from "../constants/actionTypes";

export default (state = { contests: [], contestsEnd: [] }, action) => {
    switch (action.type) {
      case actionTypes.CREATE_CONTEST:
        return { ...state, contests: [...state.contests, action.payload] };

      case actionTypes.GET_ALL_CONTESTS:
        return { ...state, contests: action.payload.contests, contestsEnd: action.payload.contestsEnd}

      case actionTypes.DELETE_CONTEST_BY_ID:
        return { ...state, contests: state.contests.filter(contest => contest._id !== action.payload) }

      case actionTypes.DELETE_CONTEST_END_BY_ID:
        return { ...state, contestsEnd: state.contestsEnd.filter(contest => contest._id !== action.payload) }
        
      default:
        return state;
    }
};