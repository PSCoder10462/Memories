import { Grid, CircularProgress } from '@material-ui/core';
import Post from './post/Post.js';
import useStyles from './styles.js'

import { useSelector } from 'react-redux'

const Posts = () => {
	const classes = useStyles();
	const posts = useSelector(state => state.posts);
	
	return (
		!posts.length ? <CircularProgress /> : (
			<Grid 
				className={classes.container} 
				container 
				alignItems='stretch' 
				spacing={3}
			>
				{posts.map(post=>(
					<Grid item key={post._id} xs={12} sm={6}>
						<Post post={post} />
					</Grid>
				))}
			</Grid>
		)
	);
};

export default Posts;
