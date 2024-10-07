import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    return res.status(201).json({
      success: true,
      filteredUsers,
    });
  } catch (error) {
    console.log(`Error in get all users controller ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
