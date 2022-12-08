import { Router } from "express";
import {
  allPosts,
  userPosts,
  createPost,
  deletePost,
} from "../controllers/posts.controllers.js";
import { verifyUser } from "../helpers/authenticate.js";

const router = Router();

router.get("/allPosts", verifyUser, allPosts);

router.get("/userPosts", verifyUser, userPosts);

router.post("/createPost", verifyUser, createPost);

router.delete("/deletePost/:id", verifyUser, deletePost);

export default router;
