import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User, {
  userLoginValidation,
  userValidation,
} from "../models/user.model.js";
import { ApiError } from "../utils/error.js";
import { uploadImageToGridFS } from "#root/services/gridfs.service.js";

const generateToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//Register User
export const registerUser = async (req, res, next, session) => {
  const { fullName, email, password } = req.body;
  let profileImageUrl = null;

  console.log(req.file);

  if (req.file) {
    try {
      let { buffer, mimetype, originalname } = req.file;
      originalname = `${Date.now()}-${originalname}`;

      const file = await uploadImageToGridFS(buffer, originalname, mimetype);

      if (!file || !file._id) {
        throw new Error("File upload failed or no ID returned");
      }

      profileImageUrl = file._id;
    } catch (err) {
      console.error("Upload error:", err);
      throw new ApiError(400, err.message);
    }
  }

  const { error } = userValidation.validate(req.body);

  if (error) throw new ApiError(400, error.message);

  const user = await User.findOne({ email });

  if (user) throw new ApiError(200, "User already exists");

  const newUser = await User.create(
    [
      {
        fullName,
        email,
        password,
        profileImageUrl,
      },
    ],
    { session }
  );

  const token = generateToken(newUser[0]._id);

  res.status(201).json({ user: newUser[0], token });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { error } = userLoginValidation.validate(req.body);
  if (error) throw new ApiError(400, error.message);

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "User not found");

  if (!(await user.comparePassword(password)))
    throw new ApiError(400, "Invalid password");

  const token = generateToken(user._id);

  res.status(200).json({ user, token });
};

export const getUser = async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user?.id).select("-password");
  if (!user) throw new ApiError(400, "User not found");
  res.status(200).json(user);
};
