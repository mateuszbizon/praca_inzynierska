import mongoose from 'mongoose';
import Tutorial from '../models/tutorial';

export const createTutorial = async (req, res) => {
    const tutorial = req.body;

    const newTutorial = new Tutorial({ ...tutorial, creator: req.userId })

    try {
        await newTutorial.save()

        res.status(201).json(newTutorial);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}