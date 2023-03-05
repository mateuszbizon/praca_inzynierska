import * as actionType from '../constants/actionTypes';

const times = (state = { times: [], bestTime: 0 }, action) => {
    switch (action.type) {
        case actionType.GET_ALL_TIMES:
            return { ...state, times: action.data.times, bestTime: action.data.bestTime }

        case actionType.ADD_NEW_TIME:
            return { ...state, times: action.data.times, bestTime: action.data.bestTime }

        case actionType.DELETE_TIME:
            return { ...state, times: action.data.times, bestTime: action.data.bestTime }

        case actionType.SET_DNF:
            return { ...state, times: action.data.times, bestTime: action.data.bestTime }

        case actionType.SET_TIME_OK:
            return { ...state, times: action.data.times, bestTime: action.data.bestTime }

        case actionType.SET_PLUS_TWO:
            return { ...state, times: action.data.times, bestTime: action.data.bestTime }
    
        default:
            return state;
    }
}

export default times;