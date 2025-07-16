import jwt from "jsonwebtoken";
import User from "#root/models/user.model.js";
import { catcher } from "#root/utils/asynHandler.js";
import { ApiError } from "#root/utils/error.js";
import { JWT_SECRET } from "#root/config/env.js";

const protect = catcher( async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    throw new ApiError(401, "Not authorized to access this route");

  let token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new ApiError(401, "Token is missing");

  const decode = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(decode.id).select("-password");
  if (!user) throw new ApiError(401, "User not found");
  req.user = user;
  next();
});

export default protect;
