import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	commentsOuterContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	commentsInnerContainer: {
		wordWrap: 'word-break',
		maxHeight: '500px',
		overflowY: 'auto',
		overflowX: 'hidden',
		marginRight: '30px',
		flex: '1',
		minWidth: '70%',
	},
}));
