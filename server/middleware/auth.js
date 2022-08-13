import jwt, {decode} from 'jsonwebtoken';

const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const isCustomAuth = token.length < 500;
		let decodedData;
		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, process.env.JWT_SECRET);
		} 
		if (token) {
			decodedData = jwt.decode(token);
		}
		if (decodedData) {
			if (decodedData.sub)
				req.userId = decodedData.sub;
			if (decodedData.id)
				req.userId = decodedData.id;
		}
		next();
	} catch(error) {
		console.log(error);
	}
};

export default auth;
