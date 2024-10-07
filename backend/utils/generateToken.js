import jwt from "jsonwebtoken";

export const generateToken = async (userId, res) => {
  try {
    // Generate JWT Token
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // Set JWT as an HTTP-only cookie
    res.cookie("jwt-chat", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development", 
    });
  } catch (error) {
    console.log("Error in Generate JWT Token: ", error.message);
  }
};
