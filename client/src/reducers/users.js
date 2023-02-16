import * as actionType from '../constants/actionTypes';

const users = (state = { users: [] }, action) => {
    switch (action.type) {
        case actionType.GET_USER:
            return { ...state, users: action.data}

        case actionType.GET_USERS_BY_SEARCH:
            return { ...state, users: action.data}
    
        default:
            return state;
    }
}

export default users;