import express from 'express';
import { getAllTimes, addNewTime } from "../controllers/times.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllTimes", auth, getAllTimes);
router.post("/addNewTime", auth, addNewTime);

export default router;