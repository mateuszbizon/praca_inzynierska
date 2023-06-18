import User from "../models/user.js";

function getDate() {
    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();

    if(month < 10) {
        month = `0${month}`;
    }

    if(day < 10) {
        day = `0${day}`;
    }

    newDate = `${year}-${month}-${day}`;
    return newDate;
}

export const getAllSessions = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const allSessions = user.sessions;

        res.status(200).json(allSessions);
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
    }
}

export const addNewSession = async (req, res) => {
    const { nameSession, times, bestTime } = req.body;

    const sessionDate = getDate();

    try {
        const user = await User.findById(req.userId);

        if (user.sessions.length === 0){
			user.sessions.push({ id: 1, date: sessionDate, name: nameSession, bestTime: bestTime, times: times })
		} else {
			const lastTime = user.sessions[user.sessions.length - 1];

			user.sessions.push({ id: lastTime.id + 1, date: sessionDate, name: nameSession, bestTime: bestTime, times: times });
		}

        const updatedSessions = await User.findByIdAndUpdate(req.userId, user, { new: true });

        res.status(200).json(updatedSessions.sessions);
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
    }
}

export const deleteSession = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(req.userId);

        user.sessions = user.sessions.filter(s => s.id !== parseInt(id))

        const updatedSessions = await User.findByIdAndUpdate(req.userId, user, { new: true });

        res.status(200).json(updatedSessions.sessions);
    } catch (error) {
        res.status(500).json({ message: "Błąd serwera. Spróbuj ponownie później.", desc: error.message });
    }
}