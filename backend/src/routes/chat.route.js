import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import {
  saveUserTech,
  sendChat,
  getAllChats,
  getOneChat,
} from "../controllers/userData.controller.js";

const router = express.Router();

router.post("/tech",saveUserTech);

//demo send chat without login user
router.post("/chats",demoChat);

// Create/send a chat message
router.post("/chats",verifyUser,sendChat);

// Get all chats
router.get("/chats",verifyUser,getAllChats);

// Get one chat
router.get("/chats/:chatId",verifyUser,getOneChat);

export default router;