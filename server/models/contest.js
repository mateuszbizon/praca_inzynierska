import mongoose from "mongoose";

const contestSchema = mongoose.Schema({
    name: String,
    users: { type: [Object], default: [] },
    startRegistration: { type: Date, default: new Date() },
    endRegistration: { type: Date, default: new Date() },
})

export default mongoose.model("Contest", contestSchema);