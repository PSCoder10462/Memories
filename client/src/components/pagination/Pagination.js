import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts.js';
import useStyles from './styles';

const Paginate = ({ page }) => {
	const classes = useStyles();
	const { totalPages, currentPage } = useSelector(state=>state.posts);
	const dispatch = useDispatch();
	useEffect(()=> {
		if (page) dispatch(getPosts(page));
	}, [page, dispatch]);

	return (
		<Pagination 
			style={{ marginTop: '10px', padding: '5px' }}
			classes={{ ul: classes.ul }}
			count={totalPages}
			page={currentPage || 1}
			color='primary'
			shape='rounded'
			renderItem={(item)=>(
				<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
			)}
		/>
	);
}

export default Paginate;
