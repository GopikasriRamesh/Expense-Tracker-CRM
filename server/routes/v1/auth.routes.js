import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "#controllers/auth.controller.js";
import { catcher } from "#utils/asynHandler.js";
import { useTransaction } from "#utils/transaction.js";
import protect from "#middlewares/auth.middleware.js";
import upload from "#root/services/gridfs.service.js";

const authRoutes = Router();

authRoutes.post("/signup", upload.single("profileImage"), useTransaction(registerUser));

authRoutes.post("/signin", catcher(loginUser));

authRoutes.get("/user", protect, catcher(getUser));

export default authRoutes;
