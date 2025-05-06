import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User, {
  userLoginValidation,
  userValidation,
} from "../models/user.model.js";

const generateToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//Register User
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, profileImageUrl } = req.body;

    const { error } = await userValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = userLoginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not exists" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if(!user) return res.status(400).json({ error: "User not exists" });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


