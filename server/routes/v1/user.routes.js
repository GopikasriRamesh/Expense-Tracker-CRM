import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "#controllers/user.controller.js";
import { catcher } from "#root/utils/asynHandler.js";

const userRoutes = Router();

userRoutes.get("/", catcher(getAllUsers));

userRoutes.get("/:id", catcher(getUser));

userRoutes.put("/:id", catcher(updateUser));

userRoutes.delete("/:id", catcher(deleteUser));

export default userRoutes;
