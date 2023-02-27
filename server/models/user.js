import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	selectedFile: String,
	posts: { type: Number, default: 0},
	id: { type: String },
});

export default mongoose.model("User", userSchema);
