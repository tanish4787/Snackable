import jwt from "jsonwebtoken";
import foodPartner from "../models/foodPartner.model";

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
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
