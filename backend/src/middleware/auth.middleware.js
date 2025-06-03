import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log("All cookies:", req.cookies); // Debug: see all cookies
    console.log("JWT cookie:", req.cookies.jwt); // Debug: specific JWT cookie

    const token = req.cookies.jwt;

    if (!token) {
      console.log("No token found in cookies"); // Debug
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    // rest of your code...
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};