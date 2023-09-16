const User = require("../models/user.js");
const commonMessages = require("../constants/commonMessages.js");

const authAdmin = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.userId);

        if (!currentUser.isAdmin) return res.status(403).json({ message: commonMessages.notAdmin });

        next();
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

module.exports = authAdmin;