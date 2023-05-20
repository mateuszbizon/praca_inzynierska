import { GET_ALL_SESSIONS, ADD_NEW_SESSION, DELETE_SESSION, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getAllSessions = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await api.getAllSessions();
  
      dispatch({ type: GET_ALL_SESSIONS, data: data})

      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
}

export const addNewSession = (session) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const { data } = await api.addNewSession(session);
  
      dispatch({ type: ADD_NEW_SESSION, data: data})

      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
}

export const deleteSession = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteSession(id);

    dispatch({ type: DELETE_SESSION, data: data })
  } catch (error) {
    console.log(error)
  }
}