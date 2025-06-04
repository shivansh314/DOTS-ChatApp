import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  console.log("Generated token for user:", userId); // Debug
  console.log("Setting cookie..."); // Debug

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "lax", // Changed from "strict" to "lax" - this is the key fix!
    secure: false, // Only secure in production
    path: "/", // Explicitly set path
  });

  console.log("Cookie set successfully"); // Debug
  return token;
};
