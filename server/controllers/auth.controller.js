import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User, {
  userLoginValidation,
  userUpdateValidation,
  userValidation,
} from "../models/user.model.js";

const generateToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//Register User
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, profileImageUrl } = req.body;

    const { error } = userValidation.validate(req.body);

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

    if(! await user.comparePassword(password)) return res.status(400).json({ error: "Invalid password" });

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(400).json({ error: "User not exists" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) return res.status(400).json({ users: [] });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(400).json({ error: "User not exists" });

    const { error } = userUpdateValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.profileImageUrl = req.body.profileImageUrl || user.profileImageUrl;

    await user.save();

    return res.status(200).json({ user, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(400).json({ error: "User not exists" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
