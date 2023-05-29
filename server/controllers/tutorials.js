import mongoose from 'mongoose';
import Tutorial from '../models/tutorial.js';

export const createTutorial = async (req, res) => {
    const tutorial = req.body;

    const newTutorial = new Tutorial({ ...tutorial, creator: req.userId })

    try {
        await newTutorial.save()

        res.status(201).json(newTutorial);
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }
}

export const getTutorialsByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const tutorials = await Tutorial.find({ username: username });
        res.status(200).json(tutorials);
    } catch (error) {
        console.log(error)
    }
}