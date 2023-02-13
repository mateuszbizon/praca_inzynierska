import express from "express";
import { getPostsByUsername, getPostById, createPost, updatePost, deletePost, likePost, commentPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getPostsByUsername/:username", auth, getPostsByUsername);
router.get("/getPostById/:id", getPostById)
router.post("/createPost", auth, createPost);
router.patch("/updatePost/:id", auth, updatePost);
router.delete("/deletePost/:id", auth, deletePost);
router.patch("/likePost/:id", auth, likePost);
router.post("/commentPost/:id", auth, commentPost)

export default router;
