const mongoose = require("mongoose");
const Contest = require("../models/contest.js");
const { sortArrayBySurname, sortArrayByAverage } = require("../utils/sortArrays.js");
const getBestTime = require("../utils/getBestTime.js");
const deleteWorstAndBestTime = require("../utils/deleteWorstAndBestTime.js");
const getAverage = require("../utils/getAverage.js");
const User = require("../models/user.js");
const contestMessages = require("../constants/contestMessages.js");
const commonMessages = require("../constants/commonMessages.js");

const createContest = async (req, res) => {
    const contest = req.body;

    const newContest = new Contest(contest)

    try {
        await newContest.save();

        res.status(201).json(newContest);
    } catch (error) {
        res.status(409).json({ message: contestMessages.contestNotCreated, desc: error.message });
    }
}

const getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find({ isEnded: false })

        const contestsEnd = await Contest.find({ isEnded: true })

        res.status(200).json({ contests: contests, contestsEnd: contestsEnd });
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const deleteContestById = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: contestMessages.contestNotFound });

        await Contest.findByIdAndRemove(id);

        res.status(200).json({ message: contestMessages.contestDeleted });
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const getContestById = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: contestMessages.contestNotFound });

        const contest = await Contest.findById(id);

        res.status(200).json(contest);
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const updateContest = async (req, res) => {
    const { id } = req.params;
    const contest = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: contestMessages.contestNotFound });

        await Contest.findByIdAndUpdate(id, contest, { new: true })

        const updatedContest = await Contest.findById(id)

        res.status(200).json(updatedContest);
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const setContestEnded = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: contestMessages.contestNotFound });

        const currentContest = await Contest.findById(id);

        currentContest.isEnded = true;

        const updatedContest = await Contest.findByIdAndUpdate(id, currentContest, { new: true });

        res.status(200).json(updatedContest);
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const setContestResumed = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: contestMessages.contestNotFound });

        const currentContest = await Contest.findById(id);

        currentContest.isEnded = false;

        const updatedContest = await Contest.findByIdAndUpdate(id, currentContest, { new: true });

        res.status(200).json(updatedContest);
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const addUserToContest = async (req, res) => {
    const { id } = req.params;
    const user = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: contestMessages.contestNotFound });

        const contest = await Contest.findById(id)

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) { return res.status(404).json({ message: contestMessages.emailNotFound })}

        const currentUser = contest.users.find(u => u.email === user.email)

        if (contest.users.indexOf(currentUser) !== -1) return res.status(400).json({ message: contestMessages.emailAlreadyExist } )

        if (contest.users.length == contest.usersLimit) return res.status(400).json({ message: contestMessages.contestNotSpaceForUser })

        contest.users.push({ ...user, name: existingUser.name.split(" ")[0], surname: existingUser.name.split(" ")[1] })

        sortArrayBySurname(contest.users)

        for (const element of contest.events) {
            if (user.events.some(u => u.value === element.value)) {
                element.users.push({email: user.email, name: existingUser.name.split(" ")[0], surname: existingUser.name.split(" ")[1], times: ["", "", "", "", ""], average: 1000000, averageText: "", bestTime: "" })
            }
        }

        const updatedContest = await Contest.findByIdAndUpdate(id, contest, { new: true });

        res.status(200).json({ message: contestMessages.addedEmailToContest, contest: updatedContest });
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const getContestEvent = async (req, res) => {
    const { id, event } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: contestMessages.contestNotFound });

        const contest = await Contest.findById(id);

        const contestEvent = contest.events.find(e => e.value === event)

        if (contest.events.indexOf(contestEvent) === -1) return res.status(404).json({ message: contestMessages.eventNotFound })

        sortArrayByAverage(contestEvent.users)

        res.status(200).json({ contest: contest, contestEvent: contestEvent });
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

const addUserTimesToContestEvent = async (req, res) => {
    const { id, event } = req.params;
    const user = req.body

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: contestMessages.contestNotFound });

        const contest = await Contest.findById(id);

        const currentEvent = contest.events.find(e => e.value === event)

        if (contest.events.indexOf(currentEvent) === -1) return res.status(404).json({ message: contestMessages.eventNotFound })

        const currentUser = currentEvent.users.find(u => u.email === user.email)

        const bestTime = getBestTime(user.times)

        const arrayAverage = deleteWorstAndBestTime(user.times, bestTime)

        const average = getAverage(arrayAverage)

        const currentUserIndex = currentEvent.users.indexOf(currentUser)

        currentEvent.users[currentUserIndex] = { ...currentUser, times: user.times, average: average.average, averageText: average.averageText, bestTime: bestTime }
        
        const updatedContest = await Contest.findByIdAndUpdate(id, contest, { new: true });

        res.status(200).json({ updatedContest })
    } catch (error) {
        res.status(500).json({ message: commonMessages.serverError, desc: error.message });
    }
}

module.exports = { addUserTimesToContestEvent, addUserToContest, getContestEvent, getContestById, createContest, getAllContests, updateContest, deleteContestById, setContestEnded, setContestResumed }