import mongoose from "mongoose";

const contestSchema = mongoose.Schema({
    name: String,
    events: [Object],
    users: { type: [Object], default: [] },
    usersLimit: Number,
    startRegistration: Date,
    endRegistration: Date,
    startContest: Date,
    endContest: Date,
    typeContest: String,
    city: { type: String, default: "" },
    place: { type: String, default: "" },
    isEnded: { type: Boolean, default: false }
})

export default mongoose.model("Contest", contestSchema);