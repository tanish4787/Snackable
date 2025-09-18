import express from "express";
import {
  createFood,
  getAllFoodItems,
  getFoodPartnerFoodById,
  likeFoodItem,
  saveFoodItem,
} from "../controllers/food.controllers.js";
import {
  verifyFoodPartner,
  verifyUser,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Food Partner routes
router.post("/", verifyFoodPartner, upload.single("video"), createFood);
router.get("/food-partner/:id", getFoodPartnerFoodById);

// User routes
router.get("/", getAllFoodItems);
router.post("/like", verifyUser, likeFoodItem);
router.post("/save", verifyUser, saveFoodItem);

export default router;
