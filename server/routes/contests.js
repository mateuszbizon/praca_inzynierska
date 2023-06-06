import express from "express";
import auth from "../middleware/auth.js";
import { createContest } from "../controllers/contests.js";

const router = express.Router();

router.post("/createContest", auth, createContest);

export default router;