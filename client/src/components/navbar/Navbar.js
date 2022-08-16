import { 
	AppBar, 
	Typography,
	Toolbar,
	Button,
	Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import useStyles from './styles.js';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogout } from '@react-oauth/google';
import { LOGOUT } from '../../constants/actionTypes.js';
import jwt_decode from 'jwt-decode';

const Navbar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector(state=>state.auth);

	const handleLogout = () => {
		dispatch({ type: LOGOUT });
		if (user?.userProfile.sub)
			googleLogout();
	};

	useEffect(()=> {
		if (user) {
			const userData = jwt_decode(user.token);
			if (userData.exp*1000 <= new Date().getTime()) 
				handleLogout();
		}
	// eslint-disable-next-line
	}, [user]);

	return (
		<AppBar 
			className={classes.appBar} 
			position='static' 
			color='inherit'
		>
			<Link to='/' className={classes.brandContainer}>
				<img 
					className={classes.image} 
					src={memoriesText} 
					alt='icon' 
					height='45'
				/>
				<img 
					className={classes.image} 
					src={memoriesLogo} 
					alt='memories' 
					height='40'
				/>
			</Link>
			<Toolbar className={classes.toolbar}>
				{ user && user.userProfile ? (
					<div className={classes.profile}>
						<Avatar 
							className={classes.purple}
							alt={user.userProfile.name}
							src={user.userProfile.picture}
						>
							{user.userProfile.name.charAt(0)}
						</Avatar>
						<Typography 
							className={classes.userName} 
							variant='h6'
						>
							{user.userProfile.name}
						</Typography>
						<Button
							variant='contained'
							className={classes.logout}
							color='secondary'
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button 
						component={Link}
						to='/auth'
						color='primary'
						variant='contained'
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
