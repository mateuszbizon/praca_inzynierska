import mongoose from "mongoose";

const tutorialSchema = mongoose.Schema({
    title: String,
    description: String,
    username: String,
    selectedFile: String,
    links: { type: [Object], default: [] },
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

export default Tutorial;