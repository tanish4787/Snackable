import FoodItem from "../models/foodItem.model.js";
import { v4, uuid } from "uuid";
import { uploadFile } from "../services/storage.service.js";

export const createFood = async (req, res) => {
  try {
    const fileUploadResult = await uploadFile(
      req.file.buffer,
      `${uuid()}-${req.file.originalname}`
    );
    const { name, description, price } = req.body;

    if (!name || !description || !price || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFoodItem = new FoodItem({
      name,
      description,
      price,
      videoUrl: fileUploadResult.url,
      foodPartner: req.user.id,
    });
    await newFoodItem.save();

    res.status(201).json({
      message: "Food item created successfully",
      foodItem: newFoodItem,
    });
  } catch (error) {
    console.error("Error creating food item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
