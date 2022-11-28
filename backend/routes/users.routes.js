import { Router } from "express";
import {
  signup,
  signin,
  refreshToken,
  profile,
  logout,
} from "../controllers/users.controllers.js";
import { verifyUser } from "../helpers/authenticate.js";
import passport from "passport";

const router = Router();

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("login", { session: false }),
  signin
);

router.post("/refreshToken", refreshToken);

router.get("/profile", verifyUser, profile);

router.get("/logout", verifyUser, logout);

export default router;
