import { Card, 
	CardActions, 
	CardContent, 
	CardMedia, 
	Typography, 
	Button,
	ButtonBase,
} from '@material-ui/core'; 
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import useStyles from './styles.js'
import { useDispatch, useSelector } from 'react-redux';
import { setId } from '../../../actions/editId.js';
import { deletePost, likePost } from '../../../actions/posts.js';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const user = useSelector(state=>state.auth);
	let userId = null;
	if (user?.userProfile._id)
		userId = user.userProfile._id;
	else if (user?.userProfile.sub)
		userId = user.userProfile.sub;
	const dispatch = useDispatch();
	return (
		<Card className={classes.card} raised elevation={6}> 
			<ButtonBase 
				className={classes.cardAction}
				onClick={()=>navigate(`/posts/${post._id}`)}
			>
				<CardMedia 
					className={classes.media} 
				image={post.selectedFile?post.selectedFile : 
							'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
				}
					title={post.title}
				/>
				<div className={classes.overlay}>
					<Typography variant='h6'> {post.creatorName} </Typography>
					<Typography variant='body2'> 
						{moment(post.createdAt).fromNow()}
					</Typography>
				</div>
				<div className={classes.details}>
					<Typography 
						variant='body2' 
						color='textSecondary'
					> 
						{post.tags?.slice(0,5)?.map(tag=>(`#${tag} `))}
					</Typography>
				</div>
				<Typography
					className={classes.title}
					variant='h5'
					gutterBottom
				>
					{post.title.substr(0, 30)}{post.title.length>30 && '...'}
				</Typography>
				<CardContent>
					<Typography
						variant='body2' 
						color='textSecondary'
						gutterBottom
						style={{ wordWrap: 'break-word' }}
					>
						{post.message?.substr(0, 120)}{post?.message.length>120 && '...'} 
					</Typography>
				</CardContent>
			</ButtonBase>
			{ userId === post.creatorId && 
				<div className={classes.overlay2}>
					<Button 
						style={{color: 'white'}} 
						size='small' 
						onClick={()=>{dispatch(setId(post._id))}}
					>
						<EditIcon fontSize='medium'/>
					</Button>
				</div>
			}
			<CardActions className={classes.cardActions}>
				<Button 
					size='small'
					color='primary'
					disabled={!userId}
					onClick={()=>{dispatch(likePost(post._id))}}
				>
					<ThumbUpAltIcon fontSize='small' />
					{`Likes: ${post.likes.length}`}
				</Button>
				{ userId === post.creatorId && 
					<Button 
						size='small'
						color='primary'
						onClick={()=>{dispatch(deletePost(post._id))}}
					>
						<DeleteIcon fontSize='small' />
						Delete
					</Button>
				}
			</CardActions>
		</Card>
	)
};

export default Post;
