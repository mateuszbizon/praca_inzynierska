const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage.js');
const User = require("../models/user.js");
const { authOperation } = require("../utils/authOperation.js");
const commonMessages = require("../constants/commonMessages.js");
const postMessages = require("../constants/postMessages.js");

 const getPostsByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const postMessages = await PostMessage.find({ username: username });

        res.status(200).json(postMessages.slice(0).reverse());
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

 const getPostById = async (req, res) => {
    const { id } = req.params;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: postMessages.postNotFound });

        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

 const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: postMessages.postNotCreated, desc: error.message });
    }
}

 const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: postMessages.postNotFound });

        const currentUser = await User.findById(req.userId);

        const currentPost = await PostMessage.findById(id);

        if (!authOperation(req.userId, currentPost.creator, currentUser.isAdmin)) return res.status(403).json({ message: commonMessages.notAuthorOrAdmin });

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

 const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: postMessages.postNotFound });

        const currentUser = await User.findById(req.userId);

        const currentPost = await PostMessage.findById(id);

        if (!authOperation(req.userId, currentPost.creator, currentUser.isAdmin)) return res.status(403).json({ message: commonMessages.notAuthorOrAdmin })

        await PostMessage.findByIdAndRemove(id);

        res.status(200).json({message: postMessages.postDeleted });
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

 const likePost = async (req, res) => {
    const { id } = req.params;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: postMessages.postNotFound });

        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex(id => id === String(req.userId))

        if(index === -1){
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }

        await PostMessage.findByIdAndUpdate(id, post, {new: true});

        const updatedPost = await PostMessage.findById(id);

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

 const commentPost = async (req, res) => {
    const { id } = req.params;
    const { commentCreator, value } = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: postMessages.postNotFound });

        const post = await PostMessage.findById(id);
    
        post.comments.push({ commentCreator: commentCreator, value: value });
    
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
        res.status(200).json(updatedPost); 
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

module.exports = { commentPost, likePost, deletePost, updatePost, getPostsByUsername, getPostById, createPost }