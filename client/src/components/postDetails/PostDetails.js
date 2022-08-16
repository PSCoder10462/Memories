import {
	Typography,
	Divider,
	Paper,
	CircularProgress,
} from '@material-ui/core';
import moment from 'moment';
import useStyles from './styles';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, getPostsBySearch } from '../../actions/posts.js';
import Comments from './comments/Comments.js';

const PostDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const classes = useStyles();
	const { post, posts } = useSelector(state=>state.posts);
	const loading = useSelector(state=>state.loading);
	const navigate = useNavigate();

	useEffect(()=>{
		dispatch(getPost(id));
	}, [id, dispatch]);

	useEffect(()=>{
		if (post) {
			dispatch(getPostsBySearch({ search: 'none', tags: post.tags.join(',') }));
		}
	}, [post, dispatch]);

	const recommendedPosts = posts?.filter(({_id})=>_id !== id);

	if (!post) {
		if (loading) return (
			<Paper elevation={6} className={classes.loadingPaper}>
				<CircularProgress size='7em'/>;
			</Paper>
		)
		else return <h1> No such post! </h1>;
	}

	return (
		<Paper elevation={6} style={{ padding: '20px', borderRadius: '15px' }}>
			<div className={classes.card}>
				<div className={classes.section}>
					<Typography variant="h3" component="h2">{post.title}</Typography>
					<Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
					<Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
					<Typography variant="h6">Created by: {post.creatorName}</Typography>
					<Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Comments post={ post }/>
					<Divider style={{ margin: '20px 0' }} />
				</div>
				<div className={classes.imageSection}>
					<img 
						className={classes.media} 
						src={
							post.selectedFile || 
							'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
						} 
						alt={post.title} 
					/>
				</div>
			</div>
			{recommendedPosts?.length && (
				<div className={classes.section}>
					<Typography variant='h5' gutterBottom>
						Yo might also like:
					</Typography>
					<Divider/>
					<div className={classes.recommendedPosts}>
						{recommendedPosts.map(({title, creatorName, _id, message, likes, selectedFile}) => (
							<div 
								style={{ margin: '20px', cursor: 'pointer' }}
								onClick={()=>navigate(`/posts/${_id}`)}
								key={_id}
							>
								<Typography variant='h6' gutterBottom> {title} </Typography>
								<Typography variant='subtitle2' gutterBottom> {creatorName} </Typography>
								<Typography variant='subtitle2' gutterBottom> {message} </Typography>
								<Typography variant='subtitle1' gutterBottom> {likes.length} </Typography>
								<img 
									src={
										selectedFile || 
										'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
									} 
									alt={title} 
									width='200px'
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</Paper>
	);
};

export default PostDetails;