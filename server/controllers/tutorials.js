const mongoose = require('mongoose');
const Tutorial = require('../models/tutorial.js');
const User = require("../models/user.js");
const { authOperation } = require("../utils/authOperation.js");
const commonMessages = require("../constants/commonMessages.js");
const tutorialMessages = require("../constants/tutorialMessages.js");

const createTutorial = async (req, res) => {
    const tutorial = req.body;

    const newTutorial = new Tutorial({ ...tutorial, creator: req.userId })

    try {
        await newTutorial.save()

        res.status(201).json(newTutorial);
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: tutorialMessages.tutorialNotCreated, desc: error.message });
    }
}

const getTutorialsByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const tutorials = await Tutorial.find({ username: username });
        res.status(200).json(tutorials.slice(0).reverse());
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const deleteTutorialById = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: tutorialMessages.tutorialNotFound });

        const currentUser = await User.findById(req.userId);

        const currentTutorial = await Tutorial.findById(id);

        if (!authOperation(req.userId, currentTutorial.creator, currentUser.isAdmin)) return res.status(403).json({ message: commonMessages.notAuthorOrAdmin });

        await Tutorial.findByIdAndRemove(id);

        res.status(200).json({ message: tutorialMessages.tutorialDeleted })
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const getTutorialById = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: tutorialMessages.tutorialNotFound });

        const tutorial = await Tutorial.findById(id);

        res.status(200).json(tutorial)
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const updateTutorial = async (req, res) => {
    const { id } = req.params;
    const tutorial = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: tutorialMessages.tutorialNotFound });

        const currentUser = await User.findById(req.userId);

        const currentTutorial = await Tutorial.findById(id);

        if (!authOperation(req.userId, currentTutorial.creator, currentUser.isAdmin)) return res.status(403).json({ message: commonMessages.notAuthorOrAdmin });

        const updatedTutorial = await Tutorial.findByIdAndUpdate(id, tutorial, { new: true })

        res.status(200).json(updatedTutorial)
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

module.exports = { updateTutorial, createTutorial, deleteTutorialById, getTutorialById, getTutorialsByUsername }