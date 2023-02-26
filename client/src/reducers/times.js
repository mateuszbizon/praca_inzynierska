import * as actionType from '../constants/actionTypes';

const times = (state = { times: [] }, action) => {
    switch (action.type) {
        case actionType.GET_USER_SESSIONS:
            return { ...state, times: action.data }

        case actionType.ADD_NEW_TIME:
            return { ...state, times: action.data }
    
        default:
            return state;
    }
}

export default times;