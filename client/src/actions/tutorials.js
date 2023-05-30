import * as actionTypes from "../constants/actionTypes";
import * as api from "../api/index";

export const createTutorial = (newTutorial, navigate) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING })

        const { data } = await api.createTutorial(newTutorial);

        dispatch({ type: actionTypes.CREATE_TUTORIAL, payload: data })

        dispatch({ type: actionTypes.END_LOADING })

        const user = JSON.parse(localStorage.getItem('user'));

        navigate(`/profile/${user.result.username}`);
    } catch (error) {
        console.log(error)
    }
}

export const getTutorialsByUsername = (username) => async (dispatch) => {
    try {
        const { data } = await api.getTutorialsByUsername(username);

        dispatch({ type: actionTypes.GET_TUTORIALS_BY_USERNAME, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deleteTutorialById = (id) => async (dispatch) => {
    try {
        await api.deleteTutorialById(id)

        dispatch({ type: actionTypes.DELETE_TUTORIAL_BY_ID, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const getTutorialById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getTutorialById(id);

        dispatch({ type: actionTypes.GET_TUTORIAL_BY_ID, payload: data })
    } catch (error) {
        console.log(error)
    }
}