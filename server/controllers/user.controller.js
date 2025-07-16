import { streamImageFromGridFS } from "#root/services/gridfs.service.js";
import User, { userUpdateValidation } from "../models/user.model.js";



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

export const getImage = async (req, res) => {
  const { id } = req.params;
  streamImageFromGridFS(id, res);
};
