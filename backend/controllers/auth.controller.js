import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    const image = req.file;

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords don't match",
      });
    }

    // Check if the username already exists
    const userExists = await User.findOne({ userName });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Username Already exists",
      });
    }

    // Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Default profile picture URLs based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    let profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

    // If an image is uploaded, upload it to Cloudinary
    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
        folder: "ChatApp",
      });
      profilePic = result.secure_url; // Use Cloudinary image URL as the profile picture
    }

    // Create a new user
    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePic, // Set the profilePic to either the default or the uploaded image
    });

    //Generate Token
    generateToken(newUser._id, res);

    // Save the user to the database
    await newUser.save();

    return res.json({
      success: true,
      message: "User Created",
    });
  } catch (error) {
    console.log(`Error in signup Controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username",
      });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token and set it in the cookie
    await generateToken(user._id, res);

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Login Success",
    });
  } catch (error) {
    console.log(`Error in Login Controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const logout =  (req, res) => {
  try {
    res.clearCookie("jwt-chat");
    return res.status(201).json({
      success:true,
      message:"Logout Successfully"
    })
  } catch (error) {
    console.log(`Error in logout Controller ${error.message}`);
    return res.json({
      success: false,
      message: error.message | "Internal Server Error",
    });
  }
};
