import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null, passwordMessage: null, loading: false, success: null, successPassword: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('user', JSON.stringify({ ...action?.data }));
            return { ...state, success: true, loading: false };

        case actionType.AUTH_FAIL:
            return {...state, authData: action.data, success: false, loading: false };

        case actionType.AUTH_LOADING:
            return { ...state, loading: true}

        case actionType.REGISTER:
            localStorage.setItem("email", action.data.email)
            return {...state, success: true, loading: false }

        case actionType.REGISTER_FAIL:
            return {...state, authData: action.data, success: false, loading: false }

        case actionType.EDIT_ACCOUNT:
            localStorage.setItem('user', JSON.stringify({...action?.data }));
            return { ...state, authData: action.data.message, success: true, loading: false }

        case actionType.EDIT_ACCOUNT_FAIL:
            return { ...state, authData: action.data, success: false, loading: false }

        case actionType.EDIT_PASSWORD:
            return { ...state, passwordMessage: action.data.message, successPassword: true, loading: false }

        case actionType.EDIT_PASSWORD_FAIL:
            return { ...state, passwordMessage: action.data, successPassword: false, loading: false }
            
        default:
            return state;
    }
}

export default authReducer;