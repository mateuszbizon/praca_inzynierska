import { AUTH, AUTH_FAIL, REGISTER, REGISTER_FAIL, EDIT_ACCOUNT, EDIT_ACCOUNT_FAIL, AUTH_LOADING, EDIT_PASSWORD, EDIT_PASSWORD_FAIL } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING })

      const { data } = await api.signIn(formData);
  
      dispatch({ type: AUTH, data: data });

      const user = JSON.parse(localStorage.getItem("user"));
  
      navigate(`/profile/${user.result.username}`);
    } catch (error) {
      dispatch({ type: AUTH_FAIL, data: error.response.data.message });
    }
};

export const signup = (formData) => async (dispatch) => {
    try {
      dispatch({ type: AUTH_LOADING })

      const { data } = await api.signUp(formData);
  
      dispatch({ type: REGISTER, data: data });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, data: error.response.data.message });
    }
};

export const editAccount = (editData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOADING })

    const { data } = await api.editAccount(editData);

    dispatch({ type: EDIT_ACCOUNT, data: data })
  } catch (error) {
    dispatch({ type: EDIT_ACCOUNT_FAIL, data: error.response.data.message })
  }
}

export const editPassword = (passwords, id) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOADING })

    const { data } = await api.editPassword(passwords, id)

    dispatch({ type: EDIT_PASSWORD, data: data })
  } catch (error) {
    dispatch({ type: EDIT_PASSWORD_FAIL, data: error.response.data.message })
  }
}