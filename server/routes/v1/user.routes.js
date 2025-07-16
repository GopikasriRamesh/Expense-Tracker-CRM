import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getImage,
  getUser,
  updateUser,
} from "#controllers/user.controller.js";
import { catcher } from "#root/utils/asynHandler.js";
import protect from "#middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.get("/", protect, catcher(getAllUsers));

userRoutes.get("/:id", protect, catcher(getUser));

userRoutes.put("/:id", protect, catcher(updateUser));

userRoutes.delete("/:id", protect, catcher(deleteUser));

userRoutes.get("/profile-images/:id", catcher(getImage));

export default userRoutes;
