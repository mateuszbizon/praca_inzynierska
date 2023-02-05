import express from "express";
import { getPostsByUsername, getPostById, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getPostsByUsername/:username", auth, getPostsByUsername);
router.get("/getPostById/:id", getPostById)
router.post("/createPost", auth, createPost);
router.patch("/updatePost/:id", auth, updatePost);
router.delete("/deletePost/:id", auth, deletePost);
router.patch("/likePost/:id", auth, likePost);

export default router;
