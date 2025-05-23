import express from "express";
import cors from "cors";
import { CLIENT_URL, PORT } from "#config/env.js";
import connectDB from "./db/mongo.js";
import v1Router from "#routes/v1/index.routes.js";
import { errorHandler } from "#utils/error.js";

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

//? routes middleware
app.use("/api/v1", v1Router);

//! error handler middleware
app.use(errorHandler);

const startServer = () => {
  connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
