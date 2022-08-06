import { 
	FETCH_ALL, 
	CREATE, 
	UPDATE, 
	DELETE, 
	LIKE 
} from '../constants/actionTypes.js';

const reducer = (state=[], action) => {
	switch(action.type) {
		case LIKE:
		case UPDATE:
			return state.map(e => (
				e._id === action.payload._id
				? action.payload
				: e
			));
		case DELETE:
			return state.filter(e => (e._id !== action.payload));
		case FETCH_ALL:
			return action.payload;
		case CREATE: 
			return [action.payload, ...state];
		default: 
			return state;
	};
};

export default reducer;
