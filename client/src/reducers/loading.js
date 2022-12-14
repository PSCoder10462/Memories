import { START_LOADING, END_LOADING } from '../constants/actionTypes.js';

const reducer = (state=true, action) => {
	switch(action.type) {
		case START_LOADING: return true;
		case END_LOADING: return false;
		default: return state;
	}
};

export default reducer;
