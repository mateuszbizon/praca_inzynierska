import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL_BY_USERNAME, FETCH_POST_BY_ID, COMMENT, FETCH_POST_BY_ID_FAIL } from '../constants/actionTypes';

export default (state = { posts: [], message: "", success: null }, action) => {
  switch (action.type) {
    case FETCH_ALL_BY_USERNAME:
      return { ...state, posts: action.payload };

    case FETCH_POST_BY_ID:
      return { ...state, posts: action.payload, success: true };

    case FETCH_POST_BY_ID_FAIL:
      return { ...state, message: action.payload, success: false }

      case LIKE:
        return { ...state, posts: action.payload };

      case CREATE:
        return { ...state, posts: [...state.posts, action.payload] };

      case UPDATE:
        return { ...state, posts: action.payload };

      case DELETE:
        return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };

      case COMMENT:
        return { ...state, posts: action.payload }
      
      default:
        return state;
  }
};