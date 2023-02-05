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

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);