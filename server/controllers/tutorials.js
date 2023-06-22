const mongoose = require('mongoose');
const Tutorial = require('../models/tutorial.js');

const createTutorial = async (req, res) => {
    const tutorial = req.body;

    const newTutorial = new Tutorial({ ...tutorial, creator: req.userId })

    try {
        await newTutorial.save()

        res.status(201).json(newTutorial);
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: "Nie udało się utworzyć poradnika.", desc: error.message });
    }
}

const getTutorialsByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const tutorials = await Tutorial.find({ username: username });
        res.status(200).json(tutorials.slice(0).reverse());
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
    }
}

const deleteTutorialById = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "Nie ma takiego poradnika z tym id" });

        await Tutorial.findByIdAndRemove(id);

        res.status(200).json({ message: "Usunięto poradnik pomyślnie" })
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
    }
}

const getTutorialById = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "Nie ma takiego poradnika z tym id" });

        const tutorial = await Tutorial.findById(id);

        res.status(200).json(tutorial)
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
    }
}

const updateTutorial = async (req, res) => {
    const { id } = req.params;
    const tutorial = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "Nie ma takiego poradnika z tym id" });

        await Tutorial.findByIdAndUpdate(id, tutorial, { new: true })

        const updatedTutorial = await Tutorial.findById(id)

        res.status(200).json(updatedTutorial)
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
    }
}

module.exports = { updateTutorial, createTutorial, deleteTutorialById, getTutorialById, getTutorialsByUsername }