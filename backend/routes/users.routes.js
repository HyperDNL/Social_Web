import { Router } from "express";
import { signup, signin } from "../controllers/users.controllers.js";
import passport from "passport";

const router = Router();

router.post("/users/signup", signup);

router.post(
  "/users/signin",
  passport.authenticate("login", { session: false }),
  signin
);

export default router;
