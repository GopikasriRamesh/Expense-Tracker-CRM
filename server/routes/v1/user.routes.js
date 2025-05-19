import { Router } from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

userRoutes.get("/:id", getUser);

userRoutes.put("/:id", updateUser);

userRoutes.delete("/:id", deleteUser);

export default userRoutes;