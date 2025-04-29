// config/env.js
import dotenv from "dotenv";

dotenv.config({ path: `.env` });

export const { PORT, CLIENT_URL, MONGODB_URL, JWT_EXPIRES_IN, JWT_SECRET } = process.env;
