import express from 'express';
import { getAllTimes, addNewTime, deleteTime, setDnf, setTimeOk, setPlusTwo } from "../controllers/times.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllTimes", auth, getAllTimes);
router.post("/addNewTime", auth, addNewTime);
router.delete("/deleteTime/:id", auth, deleteTime);
router.patch("/setDnf/:id", auth, setDnf);
router.patch("/setTimeOk/:id", auth, setTimeOk);
router.patch("/setPlusTwo/:id", auth, setPlusTwo);

export default router;