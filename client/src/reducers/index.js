import { combineReducers } from 'redux';
import posts from './posts.js';
import editId from './editId.js';
import auth from './auth.js';

export default combineReducers({
	posts,
	editId,
	auth,
});
