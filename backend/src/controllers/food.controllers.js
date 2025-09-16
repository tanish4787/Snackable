import fs from "fs";
import FoodItem from "../models/foodItem.model.js";
import Like from "../models/like.model.js";
import Save from "../models/save.model.js";
import FoodPartner from "../models/foodPartner.model.js";
import { uploadFileOnCloudinary } from "../services/storage1.service.js";
import mongoose from "mongoose";

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
      store: `/food/food-partner/${item.foodPartner?._id}`,
      likeCount: item.likeCount || 0,
      savedCount: item.savedCount || 0,
      price: item.price || "N/A",
      category: item.category || "General",
    }));

    return res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching food items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFoodPartnerFoodById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid partner ID" });
    }

    const foodPartner = await FoodPartner.findById(id);

    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }

    return res.status(200).json({
      message: "Food Partner fetched successfully",
      foodPartner,
    });
  } catch (error) {
    console.error("Error fetching food partner:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const likeFoodItem = async (req, res) => {
  try {
    const { foodItemId } = req.body;
    const userId = req.user;

    const isLiked = await Like.findOne({
      foodItem: foodItemId,
      user: userId,
    });

    if (isLiked) {
      await Like.deleteOne({ foodItem: foodItemId, user: userId });
      await FoodItem.findByIdAndUpdate(foodItemId, {
        $inc: { likeCount: -1 },
      });

      return res
        .status(200)
        .json({ message: "Food item unliked successfully" });
    }

    const newLike = new Like({
      foodItem: foodItemId,
      user: userId,
    });
    await FoodItem.findByIdAndUpdate(foodItemId, {
      $inc: { likeCount: 1 },
    });

    await newLike.save();

    return res.status(201).json({ message: "Food item liked successfully" });
  } catch (error) {
    console.error("Error liking food item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const saveFoodItem = async (req, res) => {
  try {
    const { foodItemId } = req.body;
    const userId = req.user;

    const isSaved = await Save.findOne({
      foodItem: foodItemId,
      user: userId,
    });
    if (isSaved) {
      await Save.deleteOne({ foodItem: foodItemId, user: userId });
      return res
        .status(200)
        .json({ message: "Food item unsaved successfully" });
    }
    const newSave = new Save({
      foodItem: foodItemId,
      user: userId,
    });
    await newSave.save();

    return res.status(201).json({ message: "Food item saved successfully" });
  } catch (error) {
    console.error("Error saving food item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
