import { Grid, CircularProgress } from '@material-ui/core';
import Post from './post/Post.js';
import useStyles from './styles.js'

import { useSelector } from 'react-redux'

const Posts = () => {
	const classes = useStyles();
	const {posts} = useSelector(state => state.posts);
	const loading = useSelector(state => state.loading);

	if (!loading && !posts?.length) 
		return (
			<h1> No memories found! </h1>
		);

	return (
		loading ? <CircularProgress /> : (
			<Grid 
				className={classes.container} 
				container 
				alignItems='stretch' 
				spacing={3}
			>
				{posts.map(post=>(
					<Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
						<Post post={post} />
					</Grid>
				))}
			</Grid>
		)
	);
};

export default Posts;
