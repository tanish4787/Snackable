import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);

router.post("/food-partner/register", registerFoodPartner);
router.post("/food-partner/login", loginFoodPartner);
router.post("/food-partner/logout", logoutFoodPartner);

export default router;
