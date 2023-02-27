import { ADD_NEW_TIME } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addNewTime = (session) => async (dispatch) => {
  try {
    const { data } = await api.addNewTime(session);

    dispatch({ type: ADD_NEW_TIME, data: data})
  } catch (error) {
    console.log(error);
  }
}