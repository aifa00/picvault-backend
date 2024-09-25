import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

// Create app
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));

// Connect databse
connectDB();

// Routes
app.use("/", userRoutes);

// Handle server error
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
