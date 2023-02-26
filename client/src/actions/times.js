import { GET_USER_SESSIONS, ADD_NEW_TIME } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUserSessions = () => async (dispatch) => {
  try {
    const { data } = await api.getUserSessions();

    dispatch({ type: GET_USER_SESSIONS, data: data })
  } catch (error) {
    console.log(error)
  }
}

export const addNewTime = (session) => async (dispatch) => {
  try {
    const { data } = await api.addNewTime(session);

    dispatch({ type: ADD_NEW_TIME, data: data})
  } catch (error) {
    console.log(error);
  }
}