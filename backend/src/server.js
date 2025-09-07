import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/user.routes.js";
import foodRoutes from "./routes/food.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

export default app;
