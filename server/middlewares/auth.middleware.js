import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

const generateToken = (id) => jwt.sign({ id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});


//Register User
export const registerUser = async (req, res) => {

}

export const loginUser = async (req, res) => {
    
}

export const getUserInfo = async (req, res) => {
    
}