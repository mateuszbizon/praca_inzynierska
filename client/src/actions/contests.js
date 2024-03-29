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

export const getContestById = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING })

        const { data } = await api.getContestById(id)

        dispatch({ type: actionTypes.GET_CONTEST_BY_ID, payload: data })

        dispatch({ type: actionTypes.END_LOADING })
    } catch (error) {
        dispatch({ type: actionTypes.GET_CONTEST_BY_ID_FAIL, payload: error.response.data.message })
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

export const setContestEnded = (contest) => async (dispatch) => {
    try {
        const { data } = await api.setContestEnded(contest._id);

        dispatch({ type: actionTypes.SET_CONTEST_ENDED, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const setContestResumed = (contest) => async (dispatch) => {
    try {
        const { data } = await api.setContestResumed(contest._id);

        dispatch({ type: actionTypes.SET_CONTEST_RESUMED, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const addUserToContest = (user, id) => async (dispatch) => {
    try {
        const { data } = await api.addUserToContest(user, id)

        dispatch({ type: actionTypes.BAD_REQUEST_FALSE })

        dispatch({ type: actionTypes.ADD_USER_TO_CONTEST, payload: data })
    } catch (error) {
        dispatch({ type: actionTypes.BAD_REQUEST_TRUE, payload: error.response.data.message })
    }
}

export const getContestEvent = (id, event) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING })

        const { data } = await api.getContestEvent(id, event)

        dispatch({ type: actionTypes.GET_CONTEST_EVENT, payload: data })

        dispatch({ type: actionTypes.END_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const addUserTimesToContestEvent = (id, event, userTimes, navigate) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.START_LOADING })

        await api.addUserTimesToContestEvent(id, event, userTimes)

        dispatch({ type: actionTypes.END_LOADING })

        navigate(`/live-results/${id}/${event}`)
    } catch (error) {
        console.log(error)
    }
}

export const resetContest = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.RESET_CONTEST })

        dispatch({ type: actionTypes.BAD_REQUEST_RESET })
    } catch (error) {
        console.log(error)
    }
}