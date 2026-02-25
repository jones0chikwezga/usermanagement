export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "Logout successful. Please delete token on client."
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
      error: error.message
    });
  }
};
