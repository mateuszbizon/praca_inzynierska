import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import users from './users';
import times from './times';
import sessions from './sessions';
import loaders from './loaders';

export const reducers = combineReducers({ posts, auth, users, times, sessions, loaders });