// material ui
import {
	Grid, 
	Grow,
	Container,
	Paper,
	AppBar,
	TextField,
	Button,
	Typography,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts.js';
import { useNavigate, useLocation } from 'react-router-dom';

import Form from '../form/Form.js';
import Posts from '../posts/Posts.js';
import Pagination from '../pagination/Pagination.js'
import useStyles from './styles.js';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const query = useQuery();
	const navigate = useNavigate();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');
	const tagsQuery = query.get('tags');
	const [search, setSearch] = useState(searchQuery ? searchQuery : '');
	const [tags, setTags] = useState(tagsQuery? tagsQuery.split(',') : []);
	const isSearched = useSelector(state=>state.posts.isSearched);

	const searchPost = () => {
		const newSearch = search.trim();
		setSearch(newSearch);
		if (newSearch.length || tags.length) {
			dispatch(getPostsBySearch({search: newSearch, tags: tags.join(',')}));
			navigate(`/posts/search?searchQuery=${newSearch||'none'}&tags=${tags.join(',')}`);
		} else {
			navigate('/');
		}
	};

	const handleKeyPress = e => {
		if (e.key === 'Enter') searchPost();
	};

	const handleAdd = tag => {
		tag = tag.toLowerCase();
		if (tags.indexOf(tag) === -1)
			return setTags([...tags, tag]);
	};

	const handleDelete = deleteTag => setTags(tags.filter(tag=>tag!==deleteTag));

	return (
		<Container maxWidth='xl'>
			<Grow in>
				<Grid 
					container 
					justifyContent='space-between' 
					alignItems='stretch'
					spacing={3}
				>
					<Grid item xs={12} sm={6} md={3}> 
						<AppBar className={classes.appBarSearch} position='static' color='inherit'>
							<TextField 
								name='search' 
								variant='outlined' 
								label='Search memories' 
								value={search}
								onChange={e=>{setSearch(e.target.value)}}
								onKeyPress={handleKeyPress}
							/>
							<ChipInput 
								style={{ margin: '10px 0' }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label='Search Tags'
								variant='outlined'
							/>
							<Button
								onClick={searchPost}
								className={classes.searchButton}
								color='primary'
								variant='contained'
							>
								Search
							</Button>
							<Typography variant="caption" display="block" gutterBottom color='error' style={{ marginTop: '10px'}}>
								*Please click Search to view memories if 
								tags were loaded automatically!
							</Typography>
						</AppBar>
						<Form />
						{ (!isSearched || (!searchQuery?.length && !tags?.length)) && 
							<Paper elevation={6}>
								<Pagination 
									page={page} 
									className={classes.pagination}
								/>
							</Paper>
						}
					</Grid>
					<Grid item xs={12} sm={6} md={9}> <Posts/> </Grid>
				</Grid>
			</Grow>
		</Container>
	);
}

export default Home;
