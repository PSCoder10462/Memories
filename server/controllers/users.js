import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({email});
		if (!user) return res.status(404).json({ message: 'User not found' });
		const isCorrectPassword = await bcrypt.compare(password, user.password);
		if (!isCorrectPassword) return res.status(400).json({ message: 'Incorrect credentials!' });

		const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.status(200).json({ userProfile: user, token });
	} catch (error) {
		res.status(500).json({message: 'Something went wrong'});
	}
};

export const signup = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName } = req.body;
	const userExists = await User.findOne({email});
	if (userExists) return res.status(400).json({ message: 'User already exists' });
	if (confirmPassword !== password) return res.status(400).json({ message: 'Passwrods do not match' });
	const newUser = {
		email, 
		password: await bcrypt.hash(password, 12),
		name: `${firstName} ${lastName}`
	};
	try {
		const userProfile = await User.create(newUser);
		const token = jwt.sign({ email: userProfile.email, id: userProfile._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.status(200).json({ userProfile, token });
	} catch (error) {
		res.status(500).json({ message: 'something went wrong!' });
	}
};

