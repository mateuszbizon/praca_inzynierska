import express from "express";
import { getPosts, createPost } from "../controllers/posts.js";

const router = express.Router();

router.get("/getPosts", getPosts);
router.post("/createPost", createPost);

export default router;
