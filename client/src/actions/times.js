import { ADD_NEW_TIME, GET_ALL_TIMES, DELETE_TIME, SET_DNF } from '../constants/actionTypes';
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

export const deleteTime = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteTime(id);

    dispatch({ type: DELETE_TIME, data: data})
  } catch (error) {
    console.log(error);
  }
}

export const setDnf = (id) => async (dispatch) => {
  try {
    const { data } = await api.setDnf(id);

    dispatch({ type: SET_DNF, data: data})
  } catch (error) {
    console.log(error);
  }
}