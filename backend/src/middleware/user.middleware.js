import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const verifyUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Access token required");
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export default verifyUser;