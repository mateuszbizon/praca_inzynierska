import * as actionTypes from "../constants/actionTypes";
import * as api from "../api/index";

export const createTutorial = (newTutorial, navigate) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.TUTORIAL_LOADING })

        const { data } = await api.createTutorial(newTutorial);

        dispatch({ type: actionTypes.CREATE_TUTORIAL, payload: data })

        const user = JSON.parse(localStorage.getItem('user'));

        navigate(`/profile/${user.result.username}`);
    } catch (error) {
        console.log(error)
        dispatch({ type: actionTypes.CREATE_TUTORIAL_FAIL, payload: error.response.data.message })
    }
}

export const getTutorialsByUsername = (username) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.TUTORIAL_LOADING })

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
        dispatch({ type: actionTypes.TUTORIAL_LOADING })

        const { data } = await api.getTutorialById(id);

        dispatch({ type: actionTypes.GET_TUTORIAL_BY_ID, payload: data })
    } catch (error) {
        dispatch({ type: actionTypes.GET_TUTORIAL_BY_ID_FAIL, payload: error.response.data.message })
    }
}

export const updateTutorial = (tutorial, navigate, id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.TUTORIAL_LOADING })

        const { data } = await api.updateTutorial(tutorial, id)

        dispatch({ type: actionTypes.UPDATE_TUTORIAL, payload: data })

        navigate(`/tutorials/${id}`);
    } catch (error) {
        console.log(error)
        dispatch({ type: actionTypes.UPDATE_TUTORIAL_FAIL, payload: error.response.data.message })
    }
}