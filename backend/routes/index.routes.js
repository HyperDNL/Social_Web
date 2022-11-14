import { Router } from "express";
import { getData } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", getData);

export default router;
