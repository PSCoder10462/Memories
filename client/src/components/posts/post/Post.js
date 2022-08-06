import { Card, 
	CardActions, 
	CardContent, 
	CardMedia, 
	Typography, 
	Button 
} from '@material-ui/core'; 
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import useStyles from './styles.js'
import { useDispatch } from 'react-redux';
import { setId } from '../../../actions/editId.js';
import { deletePost, likePost } from '../../../actions/posts.js';

const Post = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	return (
		<Card className={classes.card}> 
			<CardMedia 
				className={classes.media} 
				image={post.selectedFile} 
				title={post.title}
			/>
			<div className={classes.overlay}>
				<Typography variant='h6'> {post.creator} </Typography>
				<Typography variant='body2'> 
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			<div className={classes.overlay2}>
				<Button 
					style={{color: 'white'}} 
					size='small' 
					onClick={()=>{dispatch(setId(post._id))}}
				>
					<EditIcon fontSize='medium'/>
				</Button>
			</div>
			<div className={classes.details}>
				<Typography 
					variant='body2' 
					color='textSecondary'
				> 
					{post.tags?.map(tag=>(`#${tag} `))}
				</Typography>
			</div>
			<Typography
				className={classes.title}
				variant='h5'
				gutterBottom
			>
				{post.title}
			</Typography>
			<CardContent>
				<Typography
					variant='body2' 
					color='textSecondary'
					gutterBottom
				>
					{post.message}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button 
					size='small'
					color='primary'
					onClick={()=>{dispatch(likePost(post._id))}}
				>
					<ThumbUpAltIcon fontSize='small' />
					{`Likes: ${post.likeCount}`}
				</Button>
				<Button 
					size='small'
					color='primary'
					onClick={()=>{dispatch(deletePost(post._id))}}
				>
					<DeleteIcon fontSize='small' />
					Delete
				</Button>
			</CardActions>
		</Card>
	)
};

export default Post;
