import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tokenSchema = mongoose.Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

export default mongoose.model("Token", tokenSchema);