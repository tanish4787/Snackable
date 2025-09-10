import User from "../models/user.model.js";
import foodPartner from "../models/foodPartner.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const {username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token)
      .status(201)
      .json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          email: newUser.email,
          username: newUser.username,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token)
      .status(201)
      .json({
        message: "User logged in successfully",
        user: {
          id: user._id,
          email: user.email,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerFoodPartner = async (req, res) => {
  try {
    const { restaurantName, email, password } = req.body;
    if (!restaurantName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingPartner = await foodPartner.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({ message: "Food partner already exists" });
    }

    const hashedpass = await bcrypt.hash(password, 10);

    const newPartner = await foodPartner.create({
      restaurantName,
      email,
      password: hashedpass,
    });

    const token = jwt.sign(
      {
        id: newPartner._id,
      },
      process.env.JWT_SECRET
    );
    res
      .cookie("token", token)
      .status(201)
      .json({
        message: "Food partner registered successfully",
        foodPartner: {
          id: newPartner._id,
          email: newPartner.email,
          restaurantName: newPartner.restaurantName,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginFoodPartner = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const partner = await foodPartner.findOne({ email });
    if (!partner) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid =  await bcrypt.compare(password, partner.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: partner._id,
      },
      process.env.JWT_SECRET
    );
    res
      .cookie("token", token)
      .status(201)
      .json({
        message: "Food partner logged in successfully",
        foodPartner: {
          id: partner._id,
          email: partner.email,
          restaurantName: partner.restaurantName,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutFoodPartner = (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Food partner logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
