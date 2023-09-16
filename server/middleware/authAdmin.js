const User = require("../models/user.js");

const authAdmin = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.userId);

        if (!currentUser.isAdmin) return res.status(403).json({ message: "Nie jesteś administratorem" });

        next();
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
    }
}

module.exports = authAdmin;