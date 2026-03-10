// reset-admin-password.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./src/models/user.model.js";

dotenv.config();

const resetPassword = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    console.log("No admin found");
    process.exit(0);
  }
  const newPassword = "Admin@123"; // choose your new password
  admin.password = await bcrypt.hash(newPassword, 10);
  admin.isActive = true;
  await admin.save();
  console.log(`Admin password reset to: ${newPassword}`);
  process.exit(0);
};

resetPassword();