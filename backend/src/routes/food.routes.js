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

router.post("/", verifyFoodPartner, upload.single("video"), createFood);
router.get("/", verifyFoodPartner, getAllFoodItems);
router.get("/food-partner/:id", getFoodPartnerFoodById);
router.post("/like", verifyFoodPartner, likeFoodItem);
router.post("/save", verifyFoodPartner, saveFoodItem);

export default router;
