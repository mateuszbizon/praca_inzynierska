import mongoose from "mongoose";

const tutorialSchema = mongoose.Schema({
    title: String,
    username: String,
    creator: String,
    stages: { type: [Object], default: [] },
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

export default Tutorial;