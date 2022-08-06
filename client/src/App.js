// material ui
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';

import memories from './images/memories.png';
import Form from './components/form/Form.js';
import Posts from './components/posts/Posts.js';
import useStyles from './styles.js';
import { getPosts } from './actions/posts.js';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(()=> {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container maxWidth='lg'>
			<AppBar 
				className={classes.appBar} 
				position='static' 
				color='inherit'
			>
				<Typography 
					className={classes.heading} 
					variant='h2' 
					align='center'
				> 
					Memories 
				</Typography>
				<img 
					className={classes.image} 
					src={memories} 
					alt='memories' 
					height='60'
				/>
			</AppBar>
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
};

export default App;
		
