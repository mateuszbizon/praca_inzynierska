import express from "express";
import { addNewSession, getAllSessions } from "../controllers/sessions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllSessions", auth, getAllSessions);
router.post("/addNewSession", auth, addNewSession);

export default router;