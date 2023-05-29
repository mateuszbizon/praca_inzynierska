import express from 'express';
import auth from "../middleware/auth.js";
import { createTutorial, getTutorialsByUsername } from '../controllers/tutorials.js';

const router = express.Router();

router.post("/createTutorial", auth, createTutorial);
router.get("/getTutorialsByUsername/:username", getTutorialsByUsername)

export default router;