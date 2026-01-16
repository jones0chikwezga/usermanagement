import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      default: null
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },

    inviteToken: {
      type: String,
      default: null
    },

    inviteTokenExpiry: {
      type: Date,
      default: null
    },

    isActive: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
