import express from 'express';
import auth from "../middleware/auth.js";
import { createTutorial, getTutorialsByUsername, deleteTutorialById, getTutorialById } from '../controllers/tutorials.js';

const router = express.Router();

router.post("/createTutorial", auth, createTutorial);
router.get("/getTutorialsByUsername/:username", getTutorialsByUsername);
router.delete("/deleteTutorial/:id", deleteTutorialById);
router.get("/getTutorialById/:id", getTutorialById)

export default router;