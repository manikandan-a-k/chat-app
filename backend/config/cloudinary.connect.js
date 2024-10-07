import { v2 as cloudinary } from "cloudinary";

export const connectCloudinary = () => {
  try {
    // Check if the environment variables are set
    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
      throw new Error("Cloudinary environment variables are missing");
    }

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    console.log("Cloudinary Connected");
  } catch (error) {
    console.error("Error connecting to Cloudinary: ", error.message);
  }
};
