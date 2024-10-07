import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import usersRoutes from "./routes/users.route.js"
import connectDb from "./config/db.connect.js";
import { connectCloudinary } from "./config/cloudinary.connect.js";
import cookieParser from "cookie-parser";
// Initialize express app
const app = express();
app.use(express.json()); //To Access req.body
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Server is Ready");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);
//PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectCloudinary();
  connectDb();
  console.log(`Server Running on PORT ${PORT}`);
});
