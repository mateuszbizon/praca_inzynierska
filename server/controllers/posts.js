import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import User from "../models/user.js";

export const getPostsByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const postMessages = await PostMessage.find({ username: username });
        res.status(200).json(postMessages);
    } catch (error) {
        console.log(error)
    }
}

export const getPostById = async (req, res) => {
    const { id } = req.params;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Nie ma takiego posta z tym id");
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        
        const user = await User.findById(req.userId);

        let newUserPosts = user.posts;
        newUserPosts++;

        await User.findByIdAndUpdate(req.userId, {posts: newUserPosts}, { new: true});

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Nie ma takiego posta z tym id");

        await PostMessage.findByIdAndUpdate(id, post, {new: true });

        const updatedPost = await PostMessage.findById(id);

        res.json(updatedPost);
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Nie ma takiego posta z tym id");

        await PostMessage.findByIdAndRemove(id);

        const user = await User.findById(req.userId);

        let newUserPosts = user.posts;
        newUserPosts--;

        await User.findByIdAndUpdate(req.userId, {posts: newUserPosts}, { new: true });

        res.json({message: "Usuni??to post pomy??lnie"});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    
    try {
        if(!req.userId) return res.json({ message: "U??ytkownik nie jest zalogowany!" });

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Nie ma takiego posta z tym id");

        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex(id => id === String(req.userId))

        if(index === -1){
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }

        await PostMessage.findByIdAndUpdate(id, post, {new: true});

        const updatedPost = await PostMessage.findById(id);

        res.json(updatedPost);
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { commentCreator, value } = req.body;

    try {
        const post = await PostMessage.findById(id);
        console.log(commentCreator, value);
    
        post.comments.push({ commentCreator: commentCreator, value: value });
    
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
        res.json(updatedPost);
        
    } catch (error) {
        console.log(error);
    }

}