import express from "express";
import { createFood } from "../controllers/food.controllers.js";
import { verifyFoodPartner } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", verifyFoodPartner, upload.single("video"), createFood);

export default router;
