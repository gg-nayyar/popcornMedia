import app from "./app";
import { createServer } from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8004;
const server = createServer(app);

const connect = async () => {
  try {
    const mongoURI = process.env.MONGO_URI!;
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
connect();