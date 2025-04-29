import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/");

authRoutes.get("/");

authRoutes.get("/:id");

authRoutes.put("/:id");

authRoutes.delete("/:id");

export default authRoutes;
