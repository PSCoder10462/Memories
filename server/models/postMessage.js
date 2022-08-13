import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	title: String, 
	message: String, 
	creatorId: String,
	creatorName: String,
	tags: [String],
	selectedFile: String,
	likes : {
		type: [String], 
		default: []
	},
	createdAt : {
		type: Date,
		default: Date.now,
	}
});

// convert our schema to model, first arg => name of collection, (lower+plural)
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
