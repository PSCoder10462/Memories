import { SET_ID, UNSET_ID } from '../constants/actionTypes.js';

export const setId = (id) => ({
	type: SET_ID,
	payload: id,
});

export const unsetId = () => ({
	type: UNSET_ID,
});
