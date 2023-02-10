import express from 'express';
import { signin, signup, getUser, getUsersBySearch } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/getUser/:username", getUser);
router.get("/getUsersBySearch", getUsersBySearch);

export default router;