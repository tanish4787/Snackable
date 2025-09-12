import fs from "fs";
import FoodItem from "../models/foodItem.model.js";
import { uploadFileOnCloudinary } from "../services/storage1.service.js";

export const createFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload to Cloudinary
    const fileUploadResult = await uploadFileOnCloudinary(req.file.path);
    if (!fileUploadResult) {
      return res.status(500).json({ message: "File upload failed" });
    }

    // Safe unlink (don’t crash if file already gone)
    try {
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (unlinkErr) {
      console.warn("Warning: could not delete temp file:", unlinkErr.message);
    }

    // Save in DB
    const newFoodItem = new FoodItem({
      name,
      description,
      price,
      category: category || "General",
      videoUrl: fileUploadResult.secure_url || fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    await newFoodItem.save();

    return res.status(201).json({
      message: "Food item created successfully",
      foodItem: newFoodItem,
    });
  } catch (error) {
    console.error("Error creating food item:", error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find().populate(
      "foodPartner",
      "name storeUrl"
    );

    const videos = foodItems.map((item) => ({
      url: item.videoUrl,
      description: `${item.name} - ${item.description}`,
      store: item.foodPartner?.storeUrl || "#",
    }));

    return res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching food items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
