const mongoose = require("mongoose");

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

module.exports =  mongoose.model("Contest", contestSchema);