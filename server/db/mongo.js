import mongoose from "mongoose";
import { MONGODB_URL } from "../config/env.js";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;