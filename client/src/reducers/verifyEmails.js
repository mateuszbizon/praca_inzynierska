import * as actionType from '../constants/actionTypes';

const verifyEmails = (state = { success: null }, action) => {
    switch (action.type) {
        case actionType.VERIFY_REGISTER_EMAIL:
            return { ...state, success: true };

        case actionType.VERIFY_REGISTER_EMAIL_FAIL:
            return { ...state, success: false }
            
        default:
            return state;
    }
}

export default verifyEmails;