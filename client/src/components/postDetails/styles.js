import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'contain',
    maxHeight: '600px',
	maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
	  height: 'auto',
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
	maxWidth: '100%',
	wordWrap: 'break-word',
  },
  imageSection: {
    marginLeft: '20px',
	maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
	flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
	recommendedPost: {
		maxWidth: '250px',
		minWidth: '200px',
		margin: '20px',
		cursor: 'pointer',
		padding: '10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		[theme.breakpoints.down('xs')]: {
		  flexDirection: 'column',
		  marginLeft: '0',
		  marginRight: '0',
		  maxWidth: '100%',
		},
	},
}));
