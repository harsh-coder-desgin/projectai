import express from "express"
import verifyUser from "../middleware/user.middleware.js"
const router = express.Router();
import { logout,login,registerUser,refreshToken } from "../controllers/auth.controller.js"
    
// --- User Authentication Routes ---
router.post('/user/register', verifyUser,registerUser);
router.post('/user/login', verifyUser,login);

// --- Common Authentication Routes ---
router.post('/refresh-token', verifyUser,refreshToken);
router.post('/logout', verifyUser, logout);

export default router;