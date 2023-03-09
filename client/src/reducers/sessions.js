import * as actionType from '../constants/actionTypes';

const sessions = (state = { sessions: [], message: "", success: false }, action) => {
    switch (action.type) {
        case actionType.GET_ALL_SESSIONS:
            return { ...state, sessions: action.data }

        case actionType.ADD_NEW_SESSION:
            return { ...state, sessions: action.data, message: "Zapisano pomyślnie", success: true }
    
        default:
            return state;
    }
}

export default sessions;