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