import express from "express"
import verifyUser from "../middleware/user.middleware.js"
const router = express.Router();
import {
    logout,
    login,
    registerUser,
    refreshToken
} from "../controllers/auth.controllers.js"

// --- User Authentication Routes ---
router.post('/user/register', registerUser);
router.post('/user/login', login);

// --- Common Authentication Routes ---
router.post('/refresh-token', verifyUser, refreshToken);
router.post('/logout', verifyUser, logout);

export default router;