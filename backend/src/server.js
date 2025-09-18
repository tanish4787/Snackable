import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/user.routes.js";
import foodRoutes from "./routes/food.routes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://snackable-tau.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

export default app;
