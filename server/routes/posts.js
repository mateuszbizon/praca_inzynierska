import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/getPosts", getPosts);
router.post("/createPost", createPost);
router.patch("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);
router.patch("/likePost/:id", likePost);

export default router;
