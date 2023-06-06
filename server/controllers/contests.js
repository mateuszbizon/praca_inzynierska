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

export const getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find({ isEnded: false })

        const contestsEnd = await Contest.find({ isEnded: true })

        res.status(200).json({ contests: contests, contestsEnd: contestsEnd });
    } catch (error) {
        console.log(error)
    }
}

export const deleteContestById = async (req, res) => {
    const { id } = req.params;

    try {
        await Contest.findByIdAndRemove(id);

        res.status(200).json({ message: "Usunięto zawody pomyślnie" });
    } catch (error) {
        console.log(error)
    }
}