import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";


  export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN EMAIL:", email);   // ✅ ADD THIS

    const user = await User.findOne({ email });

    console.log("USER FOUND:", user);     // ✅ ADD THIS

    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!user.isActive) return res.status(403).json({ message: "Account not activated" });

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);   // ✅ ADD THIS

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    console.log(`OTP for ${user.email}: ${otp}`);

    await sendEmail(user.email, "Your Login OTP", `Your OTP is: ${otp}`);

    return res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }

};

export const setPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ message: "Token and password are required" });

    const user = await User.findOne({ inviteToken: token, inviteTokenExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.isActive = true;
    user.inviteToken = null;
    user.inviteTokenExpiry = null;
    await user.save();

    res.json({ message: "Password set successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.otp) return res.status(400).json({ message: "Invalid request" });

    if (user.otp !== otp || user.otpExpiry < Date.now()) return res.status(400).json({ message: "Invalid or expired OTP" });

    // Clear OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "OTP verification failed", error: error.message });
  }
};