import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

const v1Router = Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/user", userRoutes);


export default v1Router;