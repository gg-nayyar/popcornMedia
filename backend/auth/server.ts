import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { seedSuperAdmin } from "./seedSuperAdmin";

dotenv.config();

const PORT = process.env.PORT || 8001;
const server = createServer(app);
const MONGO_URI = process.env.MONGO_URI || "";

async function connect() {
  await mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
    await seedSuperAdmin();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}
connect();
