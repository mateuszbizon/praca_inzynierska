import * as actionType from '../constants/actionTypes';

const sessions = (state = { sessions: [], message: "", success: false }, action) => {
    switch (action.type) {
        case actionType.GET_ALL_SESSIONS:
            return { ...state, sessions: action.data }

        case actionType.ADD_NEW_SESSION:
            return { ...state, sessions: action.data.sessions, message: action.data.message, success: true }

        case actionType.DELETE_SESSION:
            return { ...state, sessions: action.data }
    
        default:
            return state;
    }
}

export default sessions;