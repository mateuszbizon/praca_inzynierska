const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    message: String,
    username: String,
    creator: String,
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [Object], default: [] },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

module.exports = PostMessage;