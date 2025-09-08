import express from "express";
import {
  createFood,
  getAllFoodItems,
} from "../controllers/food.controllers.js";
import {
  verifyFoodPartner,
  verifyUser,
} from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", verifyFoodPartner, upload.single("video"), createFood);
router.get("/", verifyUser, getAllFoodItems);

export default router;
