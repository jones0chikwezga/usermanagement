import { Router } from "express";
import { loginUser, setPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginUser);
router.post("/set-password", setPassword);

export default router;