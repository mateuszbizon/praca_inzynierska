const User = require("../models/user.js");
const Token = require("../models/token.js");
const mongoose = require("mongoose");
const verifyEmailMessages = require("../constants/verifyEmailMessages.js");

const verifyRegisterEmail = async (req, res) => {
    const { id, token } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: verifyEmailMessages.incorrectLink });

        const existingToken = await Token.findOne({ userId: id, token: token })

        if (!existingToken) return res.status(400).json({ success: false, message: verifyEmailMessages.incorrectLink })

        await User.findByIdAndUpdate(id, { verified: true }, { new: true })

        await existingToken.remove()

        res.status(200).json({ success: true, message: verifyEmailMessages.registrationConfirmed })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { verifyRegisterEmail }