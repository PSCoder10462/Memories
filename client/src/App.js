import {useEffect, useState} from 'react'

import Navbar from './components/navbar/Navbar.js';
import Home from './components/home/Home.js';
import Auth from './components/auth/Auth.js';
import PostDetails from './components/postDetails/PostDetails.js';
import { AUTH } from './constants/actionTypes.js';

import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

const App = () => {
	const dispatch = useDispatch();
	const [isUser, setIsUser] = useState(false);

	useEffect(()=> {
		const user = localStorage.getItem('profile');
		if (user) {
			dispatch({
				type: AUTH,
				payload: JSON.parse(user)
			});
			setIsUser(true);
		} else 
			setIsUser(false);

	}, [dispatch]);

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
			<Router>
				<Container maxWidth='xl'>
					<Navbar />
					<Routes>
						<Route path='/' exact element={<Navigate to='/posts' />} />
						<Route path='/auth' exact element={(isUser ? <Navigate to='/posts' /> : <Auth />)} />
						<Route path='/posts' exact element={<Home />} />
						<Route path='/posts/search' exact element={<Home />} />
						<Route path='/posts/:id' element={<PostDetails />} />
					</Routes>
				</Container>
			</Router>
		</GoogleOAuthProvider>
	);
};

export default App;

