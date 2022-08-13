import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find().sort({
			createdAt: 'desc'
		});
		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;
	const newPost = new PostMessage({...post, creatorId: req.userId });
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch(error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No post with this id!');
	const updatedPost =
		await PostMessage.findByIdAndUpdate(_id, {_id, ...post}, {new: true});
	res.json(updatedPost);
}

export const deletePost = async (req, res) => {
	const {id : _id} = req.params;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No post with this id!');
	await PostMessage.findByIdAndDelete(_id);
	res.json({ message: 'Post deleted successfully!' });
};

export const likePost = async (req, res) => {
	const {id: _id} = req.params;
	if (!req.userId) return res.json({ message: 'Unauthenticated user request' });

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No post with this id!');

	const oldPost = await PostMessage.findById(_id);

	const index = oldPost.likes.findIndex((id) => id === String(req.userId));

	if (index === -1) {
		// like
		oldPost.likes.push(req.userId);
	} else {
		oldPost.likes = oldPost.likes.filter(id=> id !== String(req.userId));
	}


	try {
		const newPost = await PostMessage.findByIdAndUpdate(_id, oldPost, {new:true});
		res.json(newPost);
	} catch(error) {
		res.json(error);
	}
};
