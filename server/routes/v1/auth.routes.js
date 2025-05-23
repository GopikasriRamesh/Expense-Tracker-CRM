import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "#controllers/auth.controller.js";
import { catcher } from "#utils/asynHandler.js";
import { useTransaction } from "#utils/transaction.js";
import protect from "#middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup", useTransaction(registerUser));

authRoutes.post("/signin", catcher(loginUser));

authRoutes.get("/user", protect, catcher(getUser));

export default authRoutes;
