import { GoogleGenAI } from "@google/genai";
import { system_prompt_AI_project_idea_generator, system_prompt_AI_project_detail_maker, SYSTEM_PROMPT } from "../utils/System prompt.js"

const keys = [process.env.Gemini_API, process.env.Gemini_API_2];
const random = Math.floor(Math.random() * 2);
const ai = new GoogleGenAI({ apiKey: keys[random] });

async function project_idea_generator(userinput = '') {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
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
        return text
    } catch (error) {
        console.log(error)
        return false
    }
}

async function project_detail_maker(userinput = '') {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
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
        return text
    } catch (error) {
        console.log(error)
        return false
    }
}

async function project_checker(userinput = '') {
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
                systemInstruction: SYSTEM_PROMPT,
            },
        });
        const text = response.text;
        return text
    } catch (error) {
        console.log(error)
        return false
    }
}

async function AItool(userinput = '') {
    try {
        const ans4 = await project_checker(userinput)
        const clean = ans4.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        const getvaleus = JSON.parse(clean)
        if (getvaleus.return === true) {
            const ans3 = await project_idea_generator(userinput)
            if (ans3) {
                const ans34 = await project_detail_maker(ans3)
                const final = JSON.parse(ans34.replace(/^```json\s*/, "").replace(/\s*```$/, ""));
                return final
            }
        } else if (getvaleus.return === false) {
            return { text: getvaleus.text }
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

export default AItool;