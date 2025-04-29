import express from "express";
import cors from "cors";
import { CLIENT_URL, PORT } from "./config/env.js";
import path from "path";
import connectDB from "./db/mongo.js";

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Ignite Express!");
});

const startServer = () => {
  connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();