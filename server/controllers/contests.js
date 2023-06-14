import Contest from "../models/contest.js";
import { sortArrayBySurname } from "../utils/sortArrays.js";

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

export const getContestById = async (req, res) => {
    const { id } = req.params;

    try {
        const contest = await Contest.findById(id);

        res.status(200).json(contest);
    } catch (error) {
        console.log(error)
    }
}

export const updateContest = async (req, res) => {
    const { id } = req.params;
    const contest = req.body;

    try {
        await Contest.findByIdAndUpdate(id, contest, { new: true })

        const updatedContest = await Contest.findById(id)

        res.status(200).json(updatedContest);
    } catch (error) {
        console.log(error)
    }
}

export const addUserToContest = async (req, res) => {
    const { id } = req.params;
    const user = req.body;

    try {
        const contest = await Contest.findById(id)

        const existingUser = contest.users.find(u => u.email === user.email)

        if (contest.users.indexOf(existingUser) !== -1) return res.status(400).json({ message: "Email już zarejestrowany"} )

        contest.users.push(user)

        sortArrayBySurname(contest.users)

        for (const element of contest.events) {
            if (user.events.some(u => u.value === element.value)) {
                element.users.push({email: user.email, name: user.name, surname: user.surname, times: ["", "", "", "", ""], average: "", bestTime: "" })
            }
        }

        const updatedContest = await Contest.findByIdAndUpdate(id, contest, { new: true });

        res.status(200).json({ message: "Dodano pomyślnie", contest: updatedContest });
    } catch (error) {
        console.log(error)
    }
}

export const getContestEvent = async (req, res) => {
    const { id, event } = req.params;

    try {
        const contest = await Contest.findById(id);

        const contestEvent = contest.events.find(e => e.value === event)

        if (contest.events.indexOf(contestEvent) === -1) return res.status(404).json({ message: "Nie znaleziono danego eventu" })

        res.status(200).json({ contest: contest, contestEvent: contestEvent });
    } catch (error) {
        console.log(error.message)
    }
}

export const addUserTimesToContestEvent = async (req, res) => {
    const { id, event } = req.params;
    const user = req.body

    try {
        const contest = await Contest.findById(id);

        
    } catch (error) {
        console.log(error);
    }
}