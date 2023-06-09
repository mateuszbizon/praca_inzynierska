import express from "express";
import auth from "../middleware/auth.js";
import { createContest, getAllContests, deleteContestById, getContestById, updateContest, addUserToContest } from "../controllers/contests.js";

const router = express.Router();

router.post("/createContest", auth, createContest);
router.get("/getAllContests", getAllContests);
router.delete("/deleteContestById/:id", deleteContestById);
router.get("/getContestById/:id", getContestById);
router.patch("/updateContest/:id", auth, updateContest);
router.patch("/addUserToContest/:id", addUserToContest)

export default router;