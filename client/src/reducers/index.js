import { combineReducers } from 'redux';
import posts from './posts.js';
import editId from './editId.js';

export default combineReducers({
	posts,
	editId
});
