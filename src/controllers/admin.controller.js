import crypto from "crypto";
import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;

    if (!username || !email || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const inviteToken = crypto.randomBytes(32).toString("hex");
    const inviteTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const user = await User.create({
      username,
      email,
      role,
      inviteToken,
      inviteTokenExpiry,
      isActive: false
    });

    const baseUrl = process.env.BASE_URL || "http://localhost:4000";

    res.status(201).json({
      message: "User created. Invite link generated.",
      inviteLink: `${baseUrl}/api/v1/auth/set-password?token=${inviteToken}`
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = isActive;
    await user.save();

    return res.json({
      message: `User has been ${isActive ? "activated" : "deactivated"}`,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};