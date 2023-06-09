import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import users from './users';
import times from './times';
import sessions from './sessions';
import loaders from './loaders';
import tutorials from './tutorials';
import contests from './contests';
import badRequest from './badRequest';

export const reducers = combineReducers({ posts, auth, users, times, sessions, loaders, tutorials, contests, badRequest });