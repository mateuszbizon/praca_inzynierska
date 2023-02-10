import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL_BY_USERNAME, FETCH_POST_BY_ID, CLEAR_DATA } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL_BY_USERNAME:
      return action.payload;

    case FETCH_POST_BY_ID:
      return action.payload;

    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));

    case CREATE:
      return [...posts, action.payload];

    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));

    case DELETE:
      return posts.filter((post) => post._id !== action.payload);

    case CLEAR_DATA:
      return action.payload;
      
    default:
      return posts;
  }
};