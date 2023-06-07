import mongoose from "mongoose";

const contestSchema = mongoose.Schema({
    name: String,
    events: { type: [Object], default: [] },
    startRegistration: { type: Date, default: new Date() },
    endRegistration: { type: Date, default: new Date() },
    startContest: { type: Date, default: new Date() },
    endContest: { type: Date, default: new Date() },
    typeContest: String,
    city: { type: String, default: "" },
    place: { type: String, default: "" },
    isEnded: { type: Boolean, default: false }
})

export default mongoose.model("Contest", contestSchema);