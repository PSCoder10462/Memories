import { combineReducers } from 'redux';
import posts from './posts.js';
import editId from './editId.js';
import auth from './auth.js';
import loading from './loading.js';

export default combineReducers({
	posts,
	editId,
	auth,
	loading,
});
