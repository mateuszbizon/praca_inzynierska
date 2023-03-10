import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }
  
    return req;
  });

export const fetchPostsByUsername = (username) => API.get(`/posts/getPostsByUsername/${username}`);
export const fetchPostById = (id) => API.get(`/posts/getPostById/${id}`);
export const createPost = (newPost) => API.post(`/posts/createPost`, newPost);
export const likePost = (id) => API.patch(`/posts/likePost/${id}`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/updatePost/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/deletePost/${id}`);
export const commentPost = (comment, id) => API.post(`/posts/commentPost/${id}`, comment)

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
export const getUser = (username) => API.get(`/user/getUser/${username}`);
export const getUsersBySearch = (search) => API.get(`/user/getUsersBySearch?search=${search}`)
export const editAccount = (editData) => API.patch(`/user/editAccount`, editData);

export const getAllTimes = () => API.get('/times/getAllTimes');
export const addNewTime = (newTime) => API.post('/times/addNewTime', newTime);
export const deleteTime = (id) => API.delete(`/times/deleteTime/${id}`);
export const deleteAllTimes = () => API.delete(`/times/deleteAllTimes`);
export const setDnf = (id) => API.patch(`/times/setDnf/${id}`);
export const setTimeOk = (id) => API.patch(`/times/setTimeOk/${id}`);
export const setPlusTwo = (id) => API.patch(`/times/setPlusTwo/${id}`);

export const getAllSessions = () => API.get('/sessions/getAllSessions');
export const addNewSession = (session) => API.post('/sessions/addNewSession', session);