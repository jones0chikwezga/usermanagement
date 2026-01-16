export const isAdmin = (req, res, next) => {
  // TEMP: Hardcode admin check for now (Postman phase)
  if (req.headers.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};
