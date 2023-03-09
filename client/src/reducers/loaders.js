import * as actionType from '../constants/actionTypes';

const loaders = (state = { isLoading: false }, action) => {
    switch (action.type) {
        case actionType.START_LOADING:
            return { ...state, isLoading: true };

        case actionType.END_LOADING:
            return { ...state, isLoading: false };
    
        default:
            return state;
    }
}

export default loaders;