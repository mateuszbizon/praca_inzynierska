import express from "express";
import { addNewSession, getAllSessions, deleteSession } from "../controllers/sessions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllSessions", auth, getAllSessions);
router.post("/addNewSession", auth, addNewSession);
router.delete("/deleteSession/:id", auth, deleteSession);

export default router;