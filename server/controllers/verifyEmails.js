import User from "../models/user.js";
import Token from "../models/token.js";

export const verifyRegisterEmail = async (req, res) => {
    const { id, token } = req.params

    try {
        const user = await User.findOne({ _id: id })

        if (!user) return res.status(400).json({ success: false, message: "Niepoprawny link"})

        const existingToken = await Token.findOne({ userId: id, token: token })

        if (!existingToken) return res.status(400).json({ success: false, message: "Niepoprawny link"})

        await User.updateOne(({ _id: id, verified: true }))
        await existingToken.remove()

        res.status(200).json({ success: true, message: "Rejestracja potwierdzona!" })
    } catch (error) {
        console.log(error)
    }
}