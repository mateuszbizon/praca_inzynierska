import User from "../models/user.js";

export const getAllSessions = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const allSessions = user.sessions;

        res.status(200).json(allSessions);
    } catch (error) {
        console.log(error)
    }
}

export const addNewSession = async (req, res) => {
    const { nameSession, times, bestTime } = req.body;

    try {
        const user = await User.findById(req.userId);

        if (user.sessions.length === 0){
			user.sessions.push({ id: 1, date: new Date(), name: nameSession, bestTime: bestTime, times: times })
		} else {
			const lastTime = user.sessions[user.sessions.length - 1];

			user.sessions.push({ id: lastTime.id + 1, date: new Date(), name: nameSession, bestTime: bestTime, times: times });
		}

        const updatedSessions = await User.findByIdAndUpdate(req.userId, user, { new: true });

        res.status(200).json(updatedSessions);
    } catch (error) {
        console.log(error)
    }
}