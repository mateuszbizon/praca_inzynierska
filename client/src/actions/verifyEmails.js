import * as api from '../api/index.js';
import * as actionTypes from "../constants/actionTypes"

export const verifyRegisterEmail = (id, token) => async (dispatch) => {
    try {
        const { data } = await api.verifyRegisterEmail(id, token)

        dispatch({ type: actionTypes.VERIFY_REGISTER_EMAIL, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: actionTypes.VERIFY_REGISTER_EMAIL_FAIL, payload: error.response.data.success })
    }
}