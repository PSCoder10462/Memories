import {useEffect} from 'react'

import Navbar from './components/navbar/Navbar.js';
import Home from './components/home/Home.js';
import Auth from './components/auth/Auth.js';
import { AUTH } from './constants/actionTypes.js';

import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
	const dispatch = useDispatch();

	useEffect(()=> {
		const user = localStorage.getItem('profile');
		if (user) 
			dispatch({
				type: AUTH,
				payload: JSON.parse(user)
			})
	}, [dispatch]);

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
			<Router>
				<Container maxWidth='lg'>
					<Navbar />
					<Routes>
						<Route path='/' exact element={<Home />} />
						<Route path='/auth' exact element={<Auth />} />
					</Routes>
				</Container>
			</Router>
		</GoogleOAuthProvider>
	);
};

export default App;

