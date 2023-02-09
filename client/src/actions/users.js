import { GET_USER } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (username) => async (dispatch) => {
    try {
      const { data } = await api.getUser(username);
  
      dispatch({ type: GET_USER, data: data })
    } catch (error) { 
      console.log(error);
    }
  }