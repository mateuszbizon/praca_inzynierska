import * as actionType from '../constants/actionTypes';

const users = (users = [], action) => {
    switch (action.type) {
        case actionType.GET_USER:
            return action.data

        case actionType.GET_USERS_BY_SEARCH:
            return action.data
    
        default:
            return users;
    }
}

export default users;