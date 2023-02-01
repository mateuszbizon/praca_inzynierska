import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchPosts = () => axios.get(`${url}/posts/getPosts`);
export const createPost = (newPost) => axios.post(`${url}/posts/createPost`, newPost);
export const likePost = (id) => axios.patch(`${url}/posts/likePost/${id}`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/posts/updatePost/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/posts/deletePost/${id}`);

export const signIn = (formData) => axios.post(`${url}/user/signin`, formData);
export const signUp = (formData) => axios.post(`${url}/user/signup`, formData);