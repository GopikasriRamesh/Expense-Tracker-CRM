import { Router } from "express";
import { loginUser, registerUser } from "../../controllers/auth.controller.js";
import { catcher } from "../../utils/asynHandler.js";
import { useTransaction } from "../../utils/transaction.js";

const authRoutes = Router();

authRoutes.post("/signup", useTransaction(registerUser));

authRoutes.post("/signin", catcher(loginUser));

export default authRoutes;
