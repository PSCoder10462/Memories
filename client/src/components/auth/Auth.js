import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
} from '@material-ui/core';
import { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CustomInput from './CustomInput.js';
import useStyles from './styles.js';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes.js';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth.js';

const Auth = () => {
	const initFormData = {
		firstName: '',
		lastName: '',
		passwrod: '',
		confirmPassword: '',
		email: '',
	};
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isSignUp, setIsSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState(initFormData);

	const handleSubmit = e => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signUp(formData, navigate));
		} else {
			dispatch(signIn(formData, navigate));
		}
	};

	const handleChange = e => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const onSuccess = async credentialResponse => {
		const jwt = credentialResponse?.credential;
		const userProfile = jwt_decode(jwt);
		try {
			dispatch({
				type: AUTH, 
				payload: { userProfile, token: jwt }
			});
			navigate(-1);
		} catch(error) {
			console.log(error);
		}
	};

	const onFailure = () => {
		console.log('Login failed');
	};

	return (
		<Container maxWidth='xs' component='main'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'> 
					{ isSignUp ? 'Sign Up' : 'Sign In' }
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid spacing={2} container>
						{ isSignUp && (
							<>
								<CustomInput 
									name='firstName'
									label='First Name'
									type='text'
									autoFocus
									half
									handleChange={handleChange}
								/>
								<CustomInput 
									name='lastName'
									label='Last Name'
									type='text'
									half
									handleChange={handleChange}
								/>
							</>
						)}
						<CustomInput
							name='email'
							type='email'
							label='Email Address'
							handleChange={handleChange}
						/>
						<CustomInput
							name='password'
							type={showPassword ? 'text' : 'password'}
							label='Password'
							handleChange={handleChange}
							handleShowPassword={()=>setShowPassword(prev=>!prev)}
						/>
						{ isSignUp && 
							<CustomInput
								name='confirmPassword'
								type={showPassword ? 'text' : 'password'}
								label='Confirm Password'
								handleChange={handleChange}
								handleShowPassword={()=>setShowPassword(prev=>!prev)}
							/>
						}
					</Grid>
					<Button 
						fullWidth 
						type='submit' 
						variant='contained' 
						color='primary'
						className={classes.submit}
					>
						{ isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN' }
					</Button>
					<Grid container justifyContent='center' spacing={2}>
						<GoogleLogin
							onSuccess={onSuccess}
							onError={onFailure}
							text='continue_with'
							size='medium'
							theme='filled_blue'
						/>
					</Grid>
					<Grid container justifyContent='center' spacing={2} style={{marginTop: 10}}>
						<Button onClick={()=>setIsSignUp(prev=>!prev)}>
							{ isSignUp ? 'Already have an account? Sign In' : 
								'New user? Sign Up'
							}
						</Button>
					</Grid>

				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
