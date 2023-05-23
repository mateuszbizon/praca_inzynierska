import * as actionTypes from "../constants/actionTypes";
import * as api from "../api/index";

export const createTutorial = (newTutorial, navigate) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING })

        const { data } = api.createTutorial(newTutorial);

        dispatch({ type: actionTypes.CREATE_TUTORIAL, payload: data })

        dispatch({ type: actionTypes.END_LOADING })

        const user = JSON.parse(localStorage.getItem('user'));

        navigate(`/profile/${user.result.username}`);
    } catch (error) {
        console.log(error)
    }
}