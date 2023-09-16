const User = require("../models/user.js");
const commonMessages = require("../constants/commonMessages.js");
const sessionMessages = require("../constants/sessionMessages.js");

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

const getAllSessions = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const allSessions = user.sessions;

        res.status(200).json(allSessions);
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const addNewSession = async (req, res) => {
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

        res.status(200).json({ message: sessionMessages.sessionCreated, sessions: updatedSessions.sessions });
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const deleteSession = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(req.userId);

        const currentSessionIndex = user.sessions.indexOf(user.sessions.find(s => s.id === parseInt(id)))

        if (currentSessionIndex === -1) return res.status(404).json({ message: sessionMessages.sessionNotFound })

        user.sessions = user.sessions.filter(s => s.id !== parseInt(id))

        const updatedSessions = await User.findByIdAndUpdate(req.userId, user, { new: true });

        res.status(200).json({ message: sessionMessages.sessionDeleted, sessions: updatedSessions.sessions });
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

module.exports = {deleteSession, addNewSession, getAllSessions }