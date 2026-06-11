import express from "express"
import verifyUser from "../middleware/user.middleware.js"
const router = express.Router();
import {
    logout,
    login,
    registerUser,
    refreshToken,
    verify
} from "../controllers/auth.controllers.js"

// --- User Authentication Routes ---
router.post('/user/register', registerUser);
router.post('/user/login', login);

// --- Common Authentication Routes ---
router.get('/user/auth', verifyUser,verify);
router.post('/refresh-token', verifyUser, refreshToken);
router.post('/logout', verifyUser, logout);

export default router;