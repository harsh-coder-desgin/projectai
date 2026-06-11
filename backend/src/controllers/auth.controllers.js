import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import User from "../models/User.model.js"
import jwt from "jsonwebtoken";

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshtoken = refreshToken
    await user.save({ validateBeforeSave: false })
    return {
    accessToken,
    refreshToken
    };
  } catch (error) {
    throw new ApiError(500, "something went wrong while refresh and access token",error)
  }
};

const login = async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required")
  }

  const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/

  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format")
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password)

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password")
  }

  const { accessToken, refreshToken } = await generateTokens(user._id)
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  }

  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        "Login successfully"
      )
    )
}

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields (username, email, password) are required");
  }

  const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const { accessToken, refreshToken } = await generateTokens(user._id.toString());
  
  const options = {
    httpOnly: true,
    secure: true,
    // sameSite: "strict"
  };
  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        "Login successfully"
      )
    )
};

const refreshToken = async (req, res) => {
  const incomeingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if (!incomeingRefreshToken) {
    throw new ApiError(400, "Refresh token is missing. Please log in again")
  }

  try {
    const decodeedtoken = jwt.verify(
      incomeingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    const users = await User.findById(decodeedtoken?._id)

    if (!users) {
      throw new ApiError(401, "Session is invalid or has expired. Please log in again.")
    }

    if (incomeingRefreshToken !== users.refreshToken) {
      throw new ApiError(401, "Session expired or token is invalid. Please log in again")
    }

    const options = {
      httpOnly: true,
      secure: true
    }

    const { accessToken, refreshToken } = await generateTokens(users._id)

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          "Token refreshed successfully"
        )
      )
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token. Please log in again")
  }
};

const logout = async (req, res) => {
  const userId = req.userId

  if (!userId) {
    throw new ApiError(401, "User authentication failed. Please log in again.");
  }

  await User.findByIdAndUpdate(
    userId, {
    $set: {
      refreshToken: ""
    }
  },{ returnDocument: "after" }

  ).catch(() => {
    throw new ApiError(500, "Something went wrong while logging out. Please try again.");
  });

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))
};

const verify = async (req, res) => {
  const users = req.user

  if (!users) {
    throw new ApiError(401, "User authentication failed. Please log in again.");
  }

  const userData = {
    username: users.username,
    email: users.email,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, userData,"User Fetch successfully"))
};

export {
  logout,
  login,
  registerUser,
  refreshToken,
  verify
}