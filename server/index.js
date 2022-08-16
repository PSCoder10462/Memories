import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();

// init app for express features
const app = express();

/*
	body parser: parses req.body to key: value pairs in a middleware
	before our handlers when Content-Type header matches type option
	- extended: false => parse to string/array
	- extended: true  => parse to any type
	- limit: limits req.body size
	.json -> returns middlware that will only parse JSON
	.urlencoded -> returns middleware that will only parse urlencoded body
*/
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


/*
	cors: cross origin resource sharing
	- scheme(protocol), hostname(domain), port, if all 3 match => same origin
	- same origin requests are always allowed
	- cors handles when origin is not same
	- preflight => check whether browser will block frontend js code
		from accessing stuff
*/
app.use(cors());

// connection with mongoDB
const PORT = process.env.PORT || 5500;

// using express middleware: all postRoutes start with /posts
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('memories');
});

/*
	mongoose: ODM(object data modeling) library for mongoDB
*/
mongoose.connect(process.env.CONNECTION_URL, {
	useNewUrlParser: true, useUnifiedTopology: true
})
	.then(()=>app.listen(PORT, ()=>console.log(`server running at PORT: ${PORT}`)))
	.catch(error=>console.log(error.message));

