import { GoogleGenAI } from "@google/genai"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import UserData from "../models/UserData.model.js"
import { System_prompt_AI_check } from "../utils/System prompt.js"
import AItool from "./Aitool.js"

const ai = new GoogleGenAI({
    apiKey: process.env.Gemini_API,
});

async function check(userinput = '') {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: userinput }],
                }
            ],
            config: {
                systemInstruction: System_prompt_AI_check,
            },
        });
        const text = response.text;
        const result = text.replace(/```json/g, "").replace(/```/g, "").trim();
        try {
            const res = JSON.parse(result);
            return res.output
        } catch (error) {
            console.log(error)
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const saveUserTech = async (req, res) => {
    const { tech } = req.body;

    if (!tech) {
        throw new ApiError(400, "Tech data is required");
    }

    const data = JSON?.parse(tech);

    let userData = await UserData.findOne({
        userId: req.userId,
    });

    if (userData) {
        const hasTech =
            userData.tech?.frontend?.length > 0 ||
            userData.tech?.backend?.length > 0 ||
            userData.tech?.database?.length > 0 ||
            userData.tech?.other?.length > 0;

        if (hasTech) {
            return res.status(400).json({
                message: "Technologies already submitted",
            });
        }
    }

    if (!userData) {
        userData = await UserData.create({
            userId: req.userId,

            tech: {
                frontend: data.frontend || [],
                backend: data.backend || [],
                database: data.database || [],
                other: data.other || [],
            },

            chats: [],
            chatHistory: [],
        });
    } else {
        if (!userData.chats) {
            userData.chats = [];
        }

        if (!userData.chatHistory) {
            userData.chatHistory = [];
        }

        userData.tech = {
            frontend: data.frontend || [],
            backend: data.backend || [],
            database: data.database || [],
            other: data.other || [],
        };

        await userData.save();
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            userData,
            "Technologies saved successfully"
        )
    );
};

const getAllChats = async (req, res) => {
    const userData = await UserData.findOne({ userId: req.userId }).select("chatHistory")

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

    const userData = await UserData.findOne({ userId: req.userId }).select("chats");

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

    let userData = await UserData.findOne({
        userId: req.userId,
    });

    if (!userData) {
        userData = await UserData.create({
            userId: req.userId,

            tech: {
                frontend: [],
                backend: [],
                database: [],
                other: [],
            },

            chats: [],
            chatHistory: [],
        });
    }

    const checking = await check(message)

    if (checking === "false") {
        throw new ApiError(500,"Error something wrong")
    }

    const userskills = userData?.tech
    const aires = await AItool(`${message} User skills:${userskills || ''}`)

    if (aires === false) {
        throw new ApiError(500, "Error something wrong or your limit over")
    }

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
                    content: {
                        text: message
                    },
                },
                {
                    role: "ai",
                    content: {
                        project_title: aires?.project_title,
                        project_description: aires?.project_description,
                        key_features: aires?.key_features,
                        security_considerations: aires?.security_considerations,
                        technology_stack: {
                            frontend: aires?.technology_stack?.frontend,
                            backend: aires?.technology_stack?.backend,
                            database: aires?.technology_stack?.database,
                            other: aires?.technology_stack?.other,
                        },
                        feature_group: aires?.feature_group,
                        features: aires?.features,
                        text: aires?.text,
                    },
                },
            ],
        });

        await userData.save();

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    chatId: newChatId,
                    aires: aires
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
        content: {
            text: message
        },
    });

    chat.messages.push({
        role: "ai",
        content: {
            project_title: aires?.project_title,
            project_description: aires?.project_description,
            key_features: aires?.key_features,
            security_considerations: aires?.security_considerations,
            technology_stack: {
                frontend: aires?.technology_stack?.frontend,
                backend: aires?.technology_stack?.backend,
                database: aires?.technology_stack?.database,
                other: aires?.technology_stack?.other,
            },
            feature_group: aires?.feature_group,
            features: aires?.features,
            text: aires?.text,
        },
    });

    await userData.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                chatId,
                aires: aires
            },
            "Message sent successfully"
        )
    );
};

const demoChat = async (req, res) => {
    const { message } = req.body;

    if (!message?.trim()) {
        throw new ApiError(400, "Message is required");
    }

    const checking = await check(message)

    if (checking === "false") {
        throw new ApiError(500, "Error something wrong")
    }

    const aires = await AItool(message)

    if (aires === false) {
        throw new ApiError(500, "Error something wrong or your limit over")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                aires: aires,
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