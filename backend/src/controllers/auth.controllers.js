import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import User from "../models/User.model.js"
import jwt from "jsonwebtoken";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m"
    }
  );

  const refreshToken = jwt.sign(
    {
      _id: user._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d"
    }
  );

  return {
    accessToken,
    refreshToken
  };
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

    const isPasswordCorrect = await User.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid password")
    }

    const { accessToken, refreshToken } = generateTokens(user._id)

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    }

    res.cookie("refreshToken", refreshToken, options)

    res.status(200).json(
        new ApiResponse(200, { accessToken, user }, "Login successful")
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

    const hashedPassword = await User.hashPassword(password); 

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    const { accessToken, refreshToken } = generateTokens(user._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    };
    res.cookie("refreshToken", refreshToken, options);

    const userResponse = {
        _id: user._id,
        username: user.username,
        email: user.email
    };

    res.status(201).json(new ApiResponse(201, { accessToken, user: userResponse }, "User registered successfully"));
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new ApiError(401, "Refresh token missing");
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        { accessToken },
        "Access token refreshed"
      )
    );
  } catch (error) {
    return res.status(401).json(
      new ApiResponse(
        401,
        null,
        "Invalid or expired refresh token"
      )
    );
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Logged out successfully"
      )
    );
  } catch (error) {
    return res.status(500).json(
      new ApiResponse(
        500,
        null,
        "Failed to logout"
      )
    );
  }
};

export { 
    logout,
    login,
    registerUser,
    refreshToken
}