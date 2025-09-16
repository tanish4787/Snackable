import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);
export default Like;
