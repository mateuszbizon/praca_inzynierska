import { ADD_NEW_TIME, GET_ALL_TIMES } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getAllTimes = () => async (dispatch) => {
  try {
    const { data } = await api.getAllTimes();

    dispatch({ type: GET_ALL_TIMES, data: data})
  } catch (error) {
    console.log(error);
  }
}

export const addNewTime = (newTime) => async (dispatch) => {
  try {
    const { data } = await api.addNewTime(newTime);

    dispatch({ type: ADD_NEW_TIME, data: data})
  } catch (error) {
    console.log(error);
  }
}