import expres from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
} from "../controllers/auth.controllers.js";
import { verifyFoodPartner } from "../middlewares/auth.middleware.js";
const router = expres.Router();

router
  .post("/user/register", registerUser)
  .post("/user/login", loginUser)
  .get("/user/logout", logoutUser);

router.post("/food-partner/register",registerFoodPartner);
router.post("/food-partner/login", loginFoodPartner);
router.get("/food-partner/logout", logoutFoodPartner);
export default router;
