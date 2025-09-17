import jwt from "jsonwebtoken";
import foodPartner from "../models/foodPartner.model.js";
import User from "../models/user.model.js";

export const verifyFoodPartner = async (req, res, next) => {
  const token = req.cookies.token || "";
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const partner = await foodPartner.findById(decoded.id);
    if (!partner) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.foodPartner = partner;
    

    return res
      .status(200)
      .json({ message: "Food Partner fetched successfully", partner });

      next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
