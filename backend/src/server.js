import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/user.routes.js";
import foodRoutes from "./routes/food.routes.js";

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://snackable-tau.vercel.app",
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.options("/*", cors({ origin: allowedOrigins, credentials: true }));

// Parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
