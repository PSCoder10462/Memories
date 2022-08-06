import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles.js'
import { unsetId } from '../../actions/editId.js';

const Form = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const editId = useSelector(state=>state.editId);
	const posts = useSelector(state=>state.posts);
	const [postData, setPostData] = useState({
		creator: '', message: '', selectedFile: '', tags: [], title: ''
	});

	useEffect(()=> {
		if (editId) {
			const editPost = posts?.find(post=>post._id === editId);
			setPostData(editPost);
		}
	}, [posts, editId]);

	const clear = () => {
		if (editId) dispatch(unsetId());
		setPostData({
			creator: '', message: '', selectedFile: '', tags: [], title: ''
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (!editId) dispatch(createPost(postData));
		else dispatch(updatePost(editId, postData));
		clear();
	};

	const handleChange = e => {
		if (e.target.name === 'tags') 
			setPostData({...postData, [e.target.name]: e.target.value?.split(',')});
		else 
			setPostData({ ...postData, [e.target.name]: e.target.value});
	};

	return (
		<Paper className={classes.paper}> 
			<form 
				autoComplete='off' 
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'> 
					{editId ? 'Editing' : 'Creating'} a Memory
				</Typography>
				<TextField
					name='creator'
					variant='outlined'
					label='Creator'
					fullWidth
					value={postData.creator}
					onChange={handleChange}
				/>
				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={handleChange}
				/>
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					multiline
					value={postData.message}
					onChange={handleChange}
				/>
				<TextField
					name='tags'
					variant='outlined'
					label='Tags <tag1,tag2,tag3...>'
					fullWidth
					value={postData.tags}
					onChange={handleChange}
				/>
				<div className = { classes.fileInput }>
					<FileBase
						type='file'
						multiple={ false }
						onDone={ ({base64}) => setPostData({
							...postData, selectedFile: base64
						}) }
					/>
				</div>
				<Button 
					className={classes.buttonSubmit} 
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					Submit
				</Button>
				<Button 
					variant='contained'
					color='secondary'
					size='small'
					fullWidth
					onClick={clear}
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
