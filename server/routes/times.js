import express from 'express';
import { getAllTimes, addNewTime, deleteTime } from "../controllers/times.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllTimes", auth, getAllTimes);
router.post("/addNewTime", auth, addNewTime);
router.delete("/deleteTime/:id", auth, deleteTime);

export default router;