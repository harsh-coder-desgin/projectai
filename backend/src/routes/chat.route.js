import express from "express";
import verifyUser from "../middleware/user.middleware.js"
import { saveUserTech,sendChat,getAllChats,getOneChat,demoChat } from "../controllers/chat.controllers.js";

const router = express.Router();

// --- Demo User Routes ----------
router.post("/chats/demo",demoChat);

// --- User Authentication Routes ---
router.post("/tech",verifyUser,saveUserTech);
router.post("/chats",verifyUser,sendChat);
router.get("/chats",verifyUser,getAllChats);
router.get("/chats/:chatId",verifyUser,getOneChat);

export default router;