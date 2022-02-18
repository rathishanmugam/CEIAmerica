import { combineReducers } from 'redux';

import userReducer from './users';

export const reducers = combineReducers({userData:userReducer});
