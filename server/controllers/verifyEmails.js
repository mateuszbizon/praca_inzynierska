const User = require("../models/user.js");
const Token = require("../models/token.js");
const mongoose = require("mongoose");

const verifyRegisterEmail = async (req, res) => {
    const { id, token } = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Niepoprawny link" });

        const existingToken = await Token.findOne({ userId: id, token: token })

        if (!existingToken) return res.status(400).json({ success: false, message: "Niepoprawny link" })

        await User.updateOne(({ _id: id, verified: true }))
        await existingToken.remove()

        res.status(200).json({ success: true, message: "Rejestracja potwierdzona!" })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { verifyRegisterEmail }