import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const setPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    // Find user by inviteToken
    const user = await User.findOne({ inviteToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid invite token" });
    }

    // Check if token expired
    if (user.inviteTokenExpiry < Date.now()) {
      return res.status(400).json({ message: "Invite token has expired" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save password and activate account
    user.password = hashedPassword;
    user.isActive = true;
    user.inviteToken = null;
    user.inviteTokenExpiry = null;

    await user.save();

    res.status(200).json({ message: "Password set successfully. Account activated." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
