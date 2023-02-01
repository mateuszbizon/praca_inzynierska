import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null, loading: false, error: false}, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('user', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, error: false };

        case actionType.AUTH_FAIL:
            return {...state, loading: false, error: true };

        case actionType.REGISTER:
            return {...state, authData: action.data, loading: false, error: false}

        case actionType.REGISTER_FAIL:
            return {...state, loading: false, error: true}
            
        default:
            return state;
    }
}




export default authReducer;