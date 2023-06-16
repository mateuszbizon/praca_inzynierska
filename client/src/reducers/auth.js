import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null, loading: false, error: false, success: false }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('user', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false };

        case actionType.AUTH_FAIL:
            return {...state, authData: action.data, error: true, loading: false };

        case actionType.AUTH_LOADING:
            return { ...state, loading: true}

        case actionType.REGISTER:
            localStorage.setItem("email", action.data.email)
            return {...state, authData: action.data, loading: false }

        case actionType.REGISTER_FAIL:
            return {...state, authData: action.data, error: true, loading: false }

        case actionType.EDIT_ACCOUNT:
            localStorage.setItem('user', JSON.stringify({...action?.data }));
            return { ...state, authData: action.data, loading: false }

        case actionType.EDIT_ACCOUNT_SUCCESS:
            return { ...state, authData: action.data, loading: false, error: false, success: true }

        case actionType.EDIT_ACCOUNT_FAIL:
            return { ...state, authData: action.data, error: true, success: false, loading: false }
            
        default:
            return state;
    }
}

export default authReducer;