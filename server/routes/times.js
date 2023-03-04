import express from 'express';
import { getAllTimes, addNewTime, deleteTime, setDnf } from "../controllers/times.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllTimes", auth, getAllTimes);
router.post("/addNewTime", auth, addNewTime);
router.delete("/deleteTime/:id", auth, deleteTime);
router.patch("/setDnf/:id", auth, setDnf);

export default router;