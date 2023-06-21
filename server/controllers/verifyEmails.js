import User from "../models/user.js";
import Token from "../models/token.js";
import mongoose from "mongoose";

export const verifyRegisterEmail = async (req, res) => {
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