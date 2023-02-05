import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL_BY_USERNAME } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPostsByUsername = (username) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsByUsername(username);

    dispatch({ type: FETCH_ALL_BY_USERNAME, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    const user = JSON.parse(localStorage.getItem('user'));

    navigate(`/profile/${user.result.username}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};