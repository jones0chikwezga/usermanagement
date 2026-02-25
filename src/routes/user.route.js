import { Router } from "express";
import { updateUser } from "../controllers/user.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = Router();

// Update user by ID (only admin)
router.put("/:id", protect, adminOnly, updateUser);

export default router;
