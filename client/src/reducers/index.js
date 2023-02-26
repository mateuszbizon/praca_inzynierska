import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import users from './users';
import times from './times';

export const reducers = combineReducers({ posts, auth, users, times });