import { GET_USER_SESSIONS, ADD_NEW_TIME, ADD_NEW_SESSION } from '../constants/actionTypes';
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

export const addNewSession = () => async (dispatch) => {
  try {
    const { data } = await api.addNewSession();

    dispatch({ type: ADD_NEW_SESSION, data: data})
  } catch (error) {
    console.log(error);
  }
}