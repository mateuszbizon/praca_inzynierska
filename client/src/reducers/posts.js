import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL_BY_USERNAME, FETCH_POST_BY_ID, CLEAR_DATA, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL_BY_USERNAME:
      return { ...state, posts: action.payload };

    case FETCH_POST_BY_ID:
      return { ...state, posts: action.payload };

      case LIKE:
        return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

      case CREATE:
        return { ...state, posts: [...state.posts, action.payload] };

      case UPDATE:
        return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

      case DELETE:
        return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
      
      default:
        return state;
  }
};