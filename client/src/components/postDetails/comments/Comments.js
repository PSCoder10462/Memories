import { useState, useEffect, useRef } from 'react';
import useStyles from './styles.js';
import { TextField, Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { commentPost } from '../../../actions/posts.js';

const Comments = ({ post }) => {
	const classes = useStyles();
	const [ comments, setComments ] = useState(post?.comments);
	const [ comment, setComment ] = useState('');
	const [ commented, setCommented ] = useState(false);
	const user = useSelector(state=>state.auth);
	const dispatch = useDispatch();
	const commentsRef = useRef();

	const scrollToBottom = () => {
		commentsRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	const handleComment = async () => {
		if (comment.trim()) {
			const finalComment = `${user.userProfile.name}: ${comment}`;
			const newComments = await dispatch(commentPost(finalComment, post._id));
			setComments(newComments);
			setCommented(true);
		}
		setComment('');
	};

	useEffect(()=> {
		if (commented)
			scrollToBottom();
	}, [comments]);

	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant='h6'>
						Comments
					</Typography>
					{ comments.map((c,i) => (
						<Typography key={i} gutterBottom variant='subtitle1'>
							<strong>{user?.userProfile.name}</strong>:
							{c.slice(user?.userProfile.name.length+1)}
						</Typography>
					))}
					<div ref={commentsRef}/>
				</div>
				{ user && 
					<div style={{ width: '70%' }}>
						<Typography gutterBottom variant='h6'>
							Write a Comment:
						</Typography>
						<TextField
							fullWidth
							minRows={4}
							variant='outlined'
							multiline
							label='Comment'
							value={comment}
							onChange={e=>setComment(e.target.value)}
						/>
						<Button
							style={{ marginTop: '10px' }}
							fullWidth
							disabled={!comment || !user}
							variant='contained'
							onClick={handleComment}
							color='primary'
						>
							Comment
						</Button>
					</div>
				}
			</div>
		</div>
	);
};

export default Comments;
