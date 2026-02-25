import { Router } from "express";
import { loginUser, setPassword } from "../controllers/auth.controller.js";
import { logoutUser } from "../controllers/logout.controller.js";
import { protect } from "../middlewares/auth.middleware.js"; // folder + file match exactly

const router = Router();

router.post("/login", loginUser);
router.post("/set-password", setPassword);
router.post("/logout", protect, logoutUser); // ✅ protected logout

export default router;
