import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
}, { timestamps: true });

const foodPartner = mongoose.model("foodPartner", foodPartnerSchema);
export default foodPartner;
