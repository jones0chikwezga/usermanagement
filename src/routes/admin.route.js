import express from "express";
import { adminCreateUser } from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/create-user", isAdmin, adminCreateUser);

export default router;
