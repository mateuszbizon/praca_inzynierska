import express from "express";
import auth from "../middleware/auth.js";
import { createContest, getAllContests, deleteContestById } from "../controllers/contests.js";

const router = express.Router();

router.post("/createContest", auth, createContest);
router.get("/getAllContests", getAllContests);
router.delete("/deleteContestById/:id", deleteContestById);

export default router;