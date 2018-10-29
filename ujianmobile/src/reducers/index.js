import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostReducer from './PostReducer';
import ImageListReducer from './ImageListReducer';

export default combineReducers({
   auth: AuthReducer,
   post: PostReducer,
   imagelist: ImageListReducer
});
