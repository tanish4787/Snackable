import FoodItem from "../models/foodItem.model.js";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../services/storage.service.js";

export const createFood = async (req, res) => {
  try {
    const fileUploadResult = await uploadFile(
      req.file.buffer,
      `${uuidv4()}-${req.file.originalname}`
    );

    const { name, description, price, category } = req.body;

    if (!name || !description || !price ||!category|| !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFoodItem = new FoodItem({
      name,
      description,
      price,
      category: category || "General",
      videoUrl: fileUploadResult.url,
      foodPartner: req.foodPartner.id ||req.foodPartner._id,
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

export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find().populate("foodPartner", "name");
    res.status(200).json({ foodItems });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
