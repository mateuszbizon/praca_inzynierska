import * as actionTypes from "../constants/actionTypes";

export default (state = { contests: [], contestsEnd: [], contest: {}, message: "" }, action) => {
    switch (action.type) {
      case actionTypes.CREATE_CONTEST:
        return { ...state, contests: [...state.contests, action.payload] };

      case actionTypes.GET_ALL_CONTESTS:
        return { ...state, contests: action.payload.contests, contestsEnd: action.payload.contestsEnd}

      case actionTypes.DELETE_CONTEST_BY_ID:
        return { ...state, contests: state.contests.filter(contest => contest._id !== action.payload) }

      case actionTypes.DELETE_CONTEST_END_BY_ID:
        return { ...state, contestsEnd: state.contestsEnd.filter(contest => contest._id !== action.payload) }

      case actionTypes.GET_CONTEST_BY_ID:
        return { ...state, contest: action.payload, message: "" }

      case actionTypes.UPDATE_TUTORIAL:
        return { ...state, contest: action.payload }

      case actionTypes.ADD_USER_TO_CONTEST:
        return { ...state, message: action.payload.message, contest: action.payload.contest }
        
      default:
        return state;
    }
};