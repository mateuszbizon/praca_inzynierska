import express from 'express';
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createTutorial", auth, )

export default router;