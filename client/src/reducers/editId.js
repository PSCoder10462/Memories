import { SET_ID, UNSET_ID } from '../constants/actionTypes.js';

const reducer = (state=null, action) => {
	switch(action.type) {
		case SET_ID: 
			return action.payload;
		case UNSET_ID:
			return null;
		default:
			return state;
	};
};

export default reducer;
