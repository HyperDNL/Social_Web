import { Router } from "express";
import {
  signup,
  signin,
  refreshToken,
  profile,
  logout,
  updateProfile,
} from "../controllers/users.controllers.js";
import { verifyUser } from "../helpers/authenticate.js";

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/refreshToken", refreshToken);

router.get("/profile", verifyUser, profile);

router.get("/logout", verifyUser, logout);

router.put("/updateProfile", verifyUser, updateProfile);

export default router;
