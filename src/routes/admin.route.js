import express from "express";
import { createUser } from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/create-user",
  protect,     // 1️⃣ Verify JWT
  adminOnly,  // 2️⃣ Verify role === admin
  createUser  // 3️⃣ Run controller
);

export default router;
