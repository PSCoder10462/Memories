import * as api from '../api';
import { AUTH } from '../constants/actionTypes.js';

export const signIn = (formData, navigate) => async (dispatch) => {
	try {
		// sign in the user
		const { data } = await api.signIn(formData);
		dispatch({
		    type: AUTH,
		    payload: data,
		});
		navigate(-1);
	} catch (error) {
		console.log(error);
		window.alert('Failed to sign in');
	}
};

export const signUp = (formData, navigate) => async (dispatch) => {
	try {
		// sign up the user
		const { data } = await api.signUp(formData);
		 dispatch({
			 type: AUTH,
			 payload: data,
		 });
		 navigate(-1);
	} catch (error) {
		console.log(error);
		window.alert('Failed to sign in');
	}
};
