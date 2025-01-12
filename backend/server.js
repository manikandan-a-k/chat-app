import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import usersRoutes from "./routes/users.route.js";
import connectDb from "./config/db.connect.js";
import { connectCloudinary } from "./config/cloudinary.connect.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();
// Initialize express app
app.use(cors());
app.use(express.json()); //To Access req.body
app.use(cookieParser());

// Routes


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
//PORT
const PORT = process.env.PORT || 3000;
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
  connectCloudinary();
  connectDb();
  console.log(`Server Running on PORT ${PORT}`);
});
