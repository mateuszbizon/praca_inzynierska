import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL_BY_USERNAME, FETCH_POST_BY_ID, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPostsByUsername = (username) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsByUsername(username);

    dispatch({ type: FETCH_ALL_BY_USERNAME, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = (id) => async (dispatch) => {

  try {
    dispatch({ type: START_LOADING });
    
    const { data } = await api.fetchPostById(id);

    dispatch({ type: FETCH_POST_BY_ID, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    dispatch({ type: END_LOADING });

    const user = JSON.parse(localStorage.getItem('user'));

    navigate(`/profile/${user.result.username}`);
  } catch (error) {
    console.log(error);
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

export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(comment, id);

    dispatch({ type: COMMENT, payload: data });

    // return data.comments;
  } catch (error) {
    console.log(error);
  }
};