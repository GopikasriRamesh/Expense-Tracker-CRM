import { Router } from "express";
import { loginUser, registerUser } from "../../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/signup", registerUser);

authRoutes.post("/signin", loginUser);

export default authRoutes;
