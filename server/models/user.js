const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	selectedFile: String,
	isAdmin: { type: Boolean, default: false },
	times: { type: [Object], default: [] },
	sessions: { type: [Object], default: [] },
	verified: { type: Boolean, default: false }
});

module.exports =  mongoose.model("User", userSchema);
