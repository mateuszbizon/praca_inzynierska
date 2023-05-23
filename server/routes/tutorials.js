import express from 'express';
import auth from "../middleware/auth.js";
import { createTutorial } from '../controllers/tutorials.js';

const router = express.Router();

router.post("/createTutorial", auth, createTutorial)

export default router;