import { GoogleGenAI } from "@google/genai";
import { system_prompt_AI_project_idea_generator, system_prompt_AI_project_detail_maker, SYSTEM_PROMPT } from "../utils/system_promot.js"

const ai = new GoogleGenAI({
    apiKey: process.env.Gemini_API,
});

async function project_idea_generator(userinput = '') {
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
                systemInstruction: system_prompt_AI_project_idea_generator,
            },
        });
        const text = response.text;
        console.log(text);
        return text
    } catch (error) {
        console.log(error)
        return false
    }
}

async function project_detail_maker(userinput = '') {
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
                systemInstruction: system_prompt_AI_project_detail_maker,
            },
        });
        const text = response.text;
        console.log(text);
        return text
    } catch (error) {
        console.log(error)
        return false
    }
}

async function AItool(msg = '') {
    let finalans = null
    const tools = {
        "project_idea_generator": project_idea_generator,
        "project_detail_maker": project_detail_maker,
    }

    const messages = []
    let maxTurns = 10;

    messages.push({
        role: "user",
        parts: [{ text: msg }],
    });
    while (maxTurns > 0) {
        maxTurns--;
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: messages,
                config: {
                    systemInstruction: SYSTEM_PROMPT,
                },
            });
            const text = response.text;
            messages.push({ role: "model", parts: [{ text }], });
            // console.log(text);
            const lines = text.replace(/```json/g, "").replace(/```/g, "").trim();
            let allchats = [];
            try {
                const res = JSON?.parse(lines);
                allchats.push(res);
                let finished = false;
                for (const allchat of allchats) {
                    if (allchat?.type === "output") {
                        try {
                            finalans = JSON?.parse(allchat.output)
                        } catch (error) {
                            console.log(error);
                            return "Error something wrong"
                        }
                        finished = true;
                        break;
                    }
                    for (const step of allchat.steps) {
                        try {
                            if (step.type === "action") {
                                const fn = tools[step.function];
                                if (!fn) {
                                    console.log("Tool not found");
                                    continue;
                                }
                                const ans = await fn(step.input);
                                if (ans === false) {
                                    return "Error something wrong"
                                }
                                const obs = {
                                    type: "observation",
                                    observation: ans,
                                };

                                messages.push({
                                    role: "user",
                                    parts: [
                                        {
                                            text: JSON.stringify(obs),
                                        },
                                    ],
                                });

                            }
                        } catch (error) {
                            console.log("Action Error:", error.message);
                        }
                    }
                }
                if (finished) {
                    break;
                }
            } catch (error) {
                console.log(error);
                return "Error something wrong"
            }
        } catch (error) {
            console.log(error);
            return "Error something wrong"
        }
    }
    return finalans
}

export default AItool;