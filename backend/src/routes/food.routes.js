import express from "express";
import {
  createFood,
  getAllFoodItems,
  getFoodPartnerFoodById,
} from "../controllers/food.controllers.js";
import {
  verifyFoodPartner,
  verifyUser,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", verifyFoodPartner, upload.single("video"), createFood);
router.get("/", verifyUser, getAllFoodItems);
router.get("/food-partner/:id", getFoodPartnerFoodById);

export default router;
