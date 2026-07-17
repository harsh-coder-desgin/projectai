import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import User from "../models/User.model.js"
import UserData from "../models/UserData.model.js"
import jwt from "jsonwebtoken";

// Before makeing AI tools need to check any security issue in user messafe then after save in mogodb in database.if something woring then send res
// then save in chat,chat history  (cheek msg ==0) = ?

const saveUserTech = async (req, res) => {
    const { tech } = req.body;

    if (!tech) {
        throw new ApiError(400, "Tech data is required");
    }
    
    const data = JSON?.parse(tech);

    const existingData = await UserData.findOne({
        userId: req.userId,
    });

    if (existingData) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "Technologies already submitted"
            )
        );
    }

    const userData = await UserData.create({
        userId: req.userId,
        tech: {
            frontend: data.frontend || [],
            backend: data.backend || [],
            database: data.database || [],
            other: data.other || [],
        },
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            userData,
            "Technologies saved successfully"
        )
    );
};

const getAllChats = async (req, res) => {
    const userData = await UserData.findOne({
        userId: req.userId,
    }).select("chatHistory")

    if (!userData) {
        throw new ApiError(404, "User data not found");
    }

    userData.chatHistory.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            userData.chatHistory,
            "Chats fetched successfully"
        )
    );
};

const getOneChat = async (req, res) => {
    const { chatId } = req.params;

    const userData = await UserData.findOne({
        userId: req.userId,
    }).select("chats");

    if (!userData) {
        throw new ApiError(404, "User data not found");
    }

    const chat = userData.chats.find(
        (chat) => chat.chatId === chatId
    );

    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            chat.messages,
            "Messages fetched successfully"
        )
    );
};

const sendChat = async (req, res) => {
    const { chatId, message } = req.body;

    if (!message?.trim()) {
        throw new ApiError(400, "Message is required");
    }

    const userData = await UserData.findOne({
        userId: req.userId,
    });

    if (!userData) {
        throw new ApiError(404, "User data not found");
    }

    // SAFETY CHECK
    // Here check user message was safe or not

    const prompt = `
        User Skills:

        Frontend: frontend
        Backend: backend
        Database: database
        Other: other

        User Question:
        ${message}

        Generate a project idea based on the user's skills.
    `;
    
    // YOUR AI LOGIC HERE
    const aiResponses = "AI response generated her new chat of this after this is res.";

    if (!chatId) {
        const newChatId = Date.now().toString();

        const title =
            message.length > 40
                ? message.slice(0, 40) + "..."
                : message;

        userData.chatHistory.push({
            chatId: newChatId,
            title,
        });

        userData.chats.push({
            chatId: newChatId,
            title,
            messages: [
                {
                    role: "user",
                    content: message,
                },
                {
                    role: "ai",
                    content: aiResponses,
                },
            ],
        });

        await userData.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    chatId: newChatId,
                    response: aiResponses,
                },
                "Chat created successfully"
            )
        );
    }    
    
    const chat = userData.chats.find(
        (chat) => chat.chatId === chatId
    );
    
    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }
    
    if (chat?.messages?.length >= 30) {
        throw new ApiError(404, "Maximum 15 chats allowed");        
    }

    chat.messages.push({
        role: "user",
        content: message,
    });

    chat.messages.push({
        role: "ai",
        content: aiResponses,
    });

    await userData.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                chatId,
                response: aiResponses,
            },
            "Message sent successfully"
        )
    );
};

const demoChat = async (req, res) => {
    const {
        frontend = [],
        backend = [],
        database = [],
        other = [],
        message,
    } = req.body;

    if (!message?.trim()) {
        throw new ApiError(400, "Message is required");
    }

    // SAFETY CHECK
    // Here check user message was safe or not

    const prompt = `
        User Technologies:

        Frontend: ${frontend.join(", ")}
        Backend: ${backend.join(", ")}
        Database: ${database.join(", ")}
        Other: ${other.join(", ")}

        User Question:
        ${message}

        Generate a project idea based on the user's skills.
        `;

    // Call your AI here
    const aiResponse = "AI response generated here";

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                response: aiResponse,
            },
            "Response generated successfully"
        )
    );
};

export { 
    saveUserTech, 
    getAllChats, 
    getOneChat, 
    sendChat, 
    demoChat 
};