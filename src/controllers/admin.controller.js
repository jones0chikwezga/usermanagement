import crypto from "crypto";
import { User } from "../models/user.model.js";

export const adminCreateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;

    if (!username || !email || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const inviteToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      username,
      email,
      role,
      inviteToken,
      inviteTokenExpiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    res.status(201).json({
      message: "User created. Invite link generated.",
      inviteLink: `http://localhost:4000/api/v1/auth/set-password?token=${inviteToken}`
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
