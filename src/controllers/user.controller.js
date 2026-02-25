import { User } from "../models/user.model.js";

// UPDATE user info
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;          // user id from URL
    const { username, email, role } = req.body;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
