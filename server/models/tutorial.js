import mongoose from "mongoose";

const tutorialSchema = mongoose.Schema({
    title: String,
    description: String,
    username: String,
    creator: String,
    selectedFile: String,
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

export default Tutorial;