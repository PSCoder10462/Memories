import { 
	FETCH_ALL, 
	FETCH_BY_SEARCH, 
	CREATE, 
	UPDATE, 
	DELETE, 
	LIKE,
	FETCH_POST,
	COMMENT,
} from '../constants/actionTypes.js';

const reducer = (state={loading: true, posts: [], isSearched: false}, action) => {
	switch(action.type) {
		case LIKE:
		case COMMENT:
		case UPDATE:
			return {
				...state,
				posts: state.posts.map(e => (
					e._id === action.payload._id
					? action.payload
					: e
				))
			};
		case DELETE:
			return {
				...state,
				posts: state.posts.filter(e => (e._id !== action.payload))
			};
		case FETCH_ALL:
			return {
				...state,
				isSearched: false,
				posts: action.payload.posts,
				currentPage: Number(action.payload.currentPage),
				totalPages: Number(action.payload.totalPages),
			};
		case FETCH_POST:
			return {
				...state,
				post: action.payload,
			};
		case FETCH_BY_SEARCH:
			return {
				...state,
				isSearched: true,
				posts: action.payload
			};
		case CREATE: 
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		default: 
			return state;
	};
};

export default reducer;
