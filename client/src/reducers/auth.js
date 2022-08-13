import { AUTH, LOGOUT } from '../constants/actionTypes.js';

const reducer = (state=null, action) => {
	switch(action.type) {
		case AUTH: 
			localStorage.setItem('profile', JSON.stringify(action.payload));
			return action.payload;
		case LOGOUT:
			localStorage.removeItem('profile');
			return null;
		default:
			return state;
	}
};

export default reducer;

