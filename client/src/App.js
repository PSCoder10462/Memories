import {useEffect} from 'react'

import Navbar from './components/navbar/Navbar.js';
import Home from './components/home/Home.js';
import Auth from './components/auth/Auth.js';
import PostDetails from './components/postDetails/PostDetails.js';
import { AUTH } from './constants/actionTypes.js';

import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

const App = () => {
	const dispatch = useDispatch();

	useEffect(()=> {
		const user = localStorage.getItem('profile');
		if (user) 
			dispatch({
				type: AUTH,
				payload: JSON.parse(user)
			});
	}, [dispatch]);

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
			<Router>
				<Container maxWidth='xl'>
					<Navbar />
					<Routes>
						<Route path='/auth' exact element={(useSelector(state=>state.auth) ? <Navigate to='/posts' /> : <Auth />)} />
						<Route path='/' exact element={<Navigate to='/posts' />} />
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

