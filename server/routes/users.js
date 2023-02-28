import express from 'express';
import { signin, signup, getUser, getUsersBySearch, editAccount, getAllTimes, addNewTime } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getUser/:username", getUser);
router.get("/getUsersBySearch", getUsersBySearch);
router.patch("/editAccount", auth, editAccount);
router.get("/getAllTimes", auth, getAllTimes);
router.post("/addNewTime", auth, addNewTime);

export default router;