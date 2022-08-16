import * as api from '../api'
import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	FETCH_BY_SEARCH,
	START_LOADING,
	END_LOADING,
	FETCH_POST,
	COMMENT,
} from '../constants/actionTypes.js';

// Action Creator: Function that returns action
// Action: {type: '', payload:[]}
export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {data} = await api.fetchPosts(page);
		dispatch({ type: FETCH_ALL, payload: data });
	} catch(error) {
		console.log(error.message);
	} finally {
		dispatch({ type: END_LOADING });
	}
}

export const getPost = id => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPost(id);
		dispatch({ type: FETCH_POST, payload: data });
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: END_LOADING });
	}
};

export const getPostsBySearch = searchQuery => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPostsBySearch(searchQuery);
		dispatch({
			type: FETCH_BY_SEARCH,
			payload: data
		});
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: END_LOADING });
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {data} = await api.createPost(post);
		dispatch({type: CREATE, payload: data });
	} catch (error) {
		console.log(error.message);
	} finally {
		dispatch({ type: END_LOADING });
	}
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
	try {
		const {data} = await api.updatePost(id, updatedPost);
		dispatch({type: UPDATE, payload: data});
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const {data} = await api.likePost(id);
		dispatch({type: LIKE, payload: data});
	} catch (error) {
		console.log(error);
	}
};

export const commentPost = (comment, id) => async dispatch => {
	try {
		const { data } = await api.commentPost(id, comment);
		dispatch({ type: COMMENT, payload: data });
		return data.comments;
	} catch (error) {
		console.log(error);
	}
};
		
