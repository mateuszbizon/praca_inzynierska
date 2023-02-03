import { AUTH, AUTH_FAIL, REGISTER, REGISTER_FAIL } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
  
      dispatch({ type: AUTH, data: data });
  
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      dispatch({ type: AUTH_FAIL });
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
  
      dispatch({ type: REGISTER, data: data });
  
      navigate('/login');
    } catch (error) {
      console.log(error);
      dispatch({ type: REGISTER_FAIL });
    }
};