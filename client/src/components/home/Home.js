// material ui
import Container from '@material-ui/core/Container';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from '../../actions/posts.js';

import Form from '../form/Form.js';
import Posts from '../posts/Posts.js';

const Home = () => {
	const dispatch = useDispatch();
	useEffect(()=> {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container maxWidth='lg'>
			<Grow in>
				<Grid 
					container 
					justifyContent='space-between' 
					alignItems='stretch'
					spacing={3}
				>
					<Grid item xs={12} sm={4}> <Form /> </Grid>
					<Grid item xs={12} sm={7}> <Posts/> </Grid>
				</Grid>
			</Grow>
		</Container>
	);
}

export default Home;
