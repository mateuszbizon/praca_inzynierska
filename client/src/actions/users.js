import { GET_USER, GET_USERS_BY_SEARCH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (username) => async (dispatch) => {
    try {
      const { data } = await api.getUser(username);
  
      dispatch({ type: GET_USER, data: data })
    } catch (error) { 
      console.log(error);
    }
}

export const getUsersBySearch = (search) => async (dispatch) => {
  try {
    const { data } = await api.getUsersBySearch(search);

    dispatch({ type: GET_USERS_BY_SEARCH, data: data });
  } catch (error) {
    console.log(error);
  }
}