import { combineReducers } from 'redux';
import authReducer from './authReducer';
import vacationReducer from './vacationReducer';

const rootReducer = combineReducers({ auth: authReducer, vacation: vacationReducer })

export default rootReducer

