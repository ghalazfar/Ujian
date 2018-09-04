import { combineReducers } from 'redux';
import MovieReducer from './MovieReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    movie: MovieReducer,
    auth: AuthReducer
})