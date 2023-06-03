import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	selectedFile: String,
	id: { type: String },
	times: { type: [Object], default: [] },
	sessions: { type: [Object], default: [] }
});

export default mongoose.model("User", userSchema);
