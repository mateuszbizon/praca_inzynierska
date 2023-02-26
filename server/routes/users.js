import express from 'express';
import { signin, signup, getUser, getUsersBySearch, editAccount, getUserSessions, addNewTime, addNewSession } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getUser/:username", getUser);
router.get("/getUsersBySearch", getUsersBySearch);
router.patch("/editAccount", auth, editAccount);
router.get("/getUserSessions", auth, getUserSessions);
router.post("/addNewTime", auth, addNewTime);
router.post("/addNewSession", auth, addNewSession);

export default router;