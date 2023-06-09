import * as actionTypes from "../constants/actionTypes"
import * as api from "../api/index"

export const createContest = (contest, navigate) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING })

        const { data } = await api.createContest(contest)

        dispatch({ type: actionTypes.CREATE_CONTEST, payload: data })

        dispatch({ type: actionTypes.END_LOADING })

        navigate('/contests');
    } catch (error) {
        console.log(error)
    }
}

export const getAllContests = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING })

        const { data } = await api.getAllContests()

        dispatch({ type: actionTypes.GET_ALL_CONTESTS, payload: data })

        dispatch({ type: actionTypes.END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const deleteContestById = (id) => async (dispatch) => {
    try {
        await api.deleteContestById(id)

        dispatch({ type: actionTypes.DELETE_CONTEST_BY_ID, payload: id })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteContestEndById = (id) => async (dispatch) => {
    try {
        await api.deleteContestById(id)

        dispatch({ type: actionTypes.DELETE_CONTEST_END_BY_ID, payload: id })
    } catch (error) {
        console.log(error.message)
    }
}

export const getContestById = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING })

        const { data } = await api.getContestById(id)

        dispatch({ type: actionTypes.GET_CONTEST_BY_ID, payload: data })

        dispatch({ type: actionTypes.END_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateContest = (contest, navigate, id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING })

        const { data } = await api.updateContest(contest, id)

        dispatch({ type: actionTypes.UPDATE_CONTEST, payload: data })

        dispatch({ type: actionTypes.END_LOADING })

        navigate('/contests');
    } catch (error) {
        console.log(error)
    }
}

export const addUserToContest = (user, id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING })

        const { data } = await api.addUserToContest(user, id)

        dispatch({ type: actionTypes.BAD_REQUEST_FALSE })

        dispatch({ type: actionTypes.ADD_USER_TO_CONTEST, payload: data })

        dispatch({ type: actionTypes.END_LOADING })
    } catch (error) {
        dispatch({ type: actionTypes.BAD_REQUEST_TRUE, payload: error.response.data.message })
    }
}