import Contest from "../models/contest.js";

export const createContest = async (req, res) => {
    const contest = req.body;

    const newContest = new Contest(contest)

    try {
        await newContest.save();

        res.status(201).json(newContest);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}