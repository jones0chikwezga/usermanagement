import express from "express";
import { setPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/set-password", setPassword);

export default router;
