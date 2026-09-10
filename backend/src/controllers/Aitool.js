import { GoogleGenAI } from "@google/genai";
import { system_prompt_AI_project_idea_generator, system_prompt_AI_project_detail_maker, SYSTEM_PROMPT } from "../utils/System prompt.js"

// function delay(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }
// const keys = [process.env.Gemini_API_2,process.env.Gemini_API];
// let currentIndex = 0;
// async function AItool(msg = '') {
//     for (let i = 0; i < keys.length; i++) {
//         console.log(currentIndex);
//         const key = keys[currentIndex];
//         let finalans = null
//         const tools = {
//             "project_idea_generator": project_idea_generator,
//             "project_detail_maker": project_detail_maker,
//         }

//         const messages = []
//         let maxTurns = 10;

//         messages.push({
//             role: "user",
//             parts: [{ text: msg }],
//         });

//         async function project_idea_generator(userinput = '') {
//             try {
//                 const ai = new GoogleGenAI({ apiKey: keys[currentIndex] });
//                 const response = await ai.models.generateContent({
//                     model: "gemini-2.5-flash-lite",
//                     contents: [
//                         {
//                             role: "user",
//                             parts: [{ text: userinput }],
//                         }
//                     ],
//                     config: {
//                         systemInstruction: system_prompt_AI_project_idea_generator,
//                     },
//                 });
//                 if (response.status === 429 || response.status === 401) {
//                     currentIndex = (currentIndex + 1) % keys.length; 
//                     return false
//                 }
//                 const text = response.text;
//                 return text
//             } catch (error) {
//                 if (error.status === 503) {
//                     const wait = Math.pow(2, 5) * 1000;
//                     console.log(`Retrying in ${wait} ms`);
//                     await delay(wait);
//                     return false
//                 } else {
//                     console.log(error)
//                     return false
//                 }
//             }
//         }

//         async function project_detail_maker(userinput = '') {
//             try {
//                 const ai = new GoogleGenAI({ apiKey: keys[currentIndex] });
//                 const response = await ai.models.generateContent({
//                     model: "gemini-2.5-flash-lite",
//                     contents: [
//                         {
//                             role: "user",
//                             parts: [{ text: userinput }],
//                         }
//                     ],
//                     config: {
//                         systemInstruction: system_prompt_AI_project_detail_maker,
//                     },
//                 });
//                 if (response.status === 429 || response.status === 401) {
//                     currentIndex = (currentIndex + 1) % keys.length; 
//                     return false
//                 }
//                 const text = response.text;
//                 return text
//             } catch (error) {
//                 if (error.status === 503) {
//                     const wait = Math.pow(2, 5) * 1000;
//                     console.log(`Retrying in ${wait} ms`);
//                     await delay(wait);
//                     return false
//                 } else {
//                     console.log(error)
//                     return false
//                 }
//             }
//         }

//         while (maxTurns > 0) {
//             const ai = new GoogleGenAI({ apiKey: keys[currentIndex] });
//             maxTurns--;
//             try {
//                 const response = await ai.models.generateContent({
//                     model: "gemini-2.5-flash-lite",
//                     contents: messages,
//                     config: {
//                         systemInstruction: SYSTEM_PROMPT,
//                     },
//                 });
//                 if (response.status === 429 || response.status === 401) {
//                     currentIndex = (currentIndex + 1) % keys.length; 
//                     continue;
//                 }
//                 const text = response.text;
//                 // console.log(text);
//                 messages.push({ role: "model", parts: [{ text }], });
//                 const lines = text.replace(/```json/g, "").replace(/```/g, "").trim();
//                 let allchats = [];
//                 try {
//                     const res = JSON?.parse(lines);
//                     allchats.push(res);
//                     let finished = false;
//                     for (const allchat of allchats) {
//                         if (allchat?.type === "output") {
//                             try {
//                                 finalans = JSON?.parse(allchat.output)
//                             } catch (error) {
//                                 console.log(error);
//                                 return false
//                             }
//                             finished = true;
//                             break;
//                         }
//                         for (const step of allchat.steps) {
//                             try {
//                                 if (step.type === "action") {
//                                     const fn = tools[step.function];
//                                     if (!fn) {
//                                         console.log("Tool not found");
//                                         continue;
//                                     }
//                                     let check = 0
//                                     while (check <=2) {
//                                         ans = await fn(step.input);
//                                         if (ans === false) {
//                                             check++
//                                         }else{
//                                             break;
//                                         }
//                                     }
//                                     if (ans) {
//                                         const obs = {
//                                             type: "observation",
//                                             observation: ans,
//                                         };

//                                         messages.push({
//                                             role: "user",
//                                             parts: [
//                                                 {
//                                                     text: JSON.stringify(obs),
//                                                 },
//                                             ],
//                                         });
//                                     }
//                                 }
//                             } catch (error) {
//                                 console.log("Action Error:", error.message);
//                                 return false
//                             }
//                         }
//                     }
//                     if (finished) {
//                         break;
//                     }
//                 } catch (error) {
//                     console.log(error);
//                     return false
//                 }
//             } catch (error) {
//                 console.log(error);
//                 if (error.status === 503) {
//                     const wait = Math.pow(2, 5) * 1000;
//                     console.log(`Retrying in ${wait} ms`);
//                     await delay(wait);
//                 }
//                 else{
//                     console.log(error);
//                     return false
//                 }
//             }
//         }
//         return finalans
//         console.log(i);
//     }

// }

// const keys = [process.env.Gemini_API, process.env.Gemini_API_2];
// const random = Math.floor(Math.random() * 2) + 1;
// const ai = new GoogleGenAI({ apiKey: keys[random] });

const keys = [process.env.Gemini_API, process.env.Gemini_API_2];
const random = Math.floor(Math.random() * 2) + 1;
const ai = new GoogleGenAI({ apiKey: keys[1] });

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
            model: "gemini-2.5-flash-lite",
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
    const ans4 = await project_checker(userinput)
    const clean = ans4
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
        console.log(clean);
        
    const getvaleus = JSON.parse(clean)
    console.log(getvaleus);
    if (getvaleus.return === true) {
        const ans3 = await project_idea_generator(userinput)
        if (ans3) {
            const ans34 = await project_detail_maker(ans3)
            console.log(JSON.parse(ans34.replace(/^```json\s*/, "")
        .replace(/\s*```$/, "")));
            return JSON.parse(ans34.replace(/^```json\s*/, "")
        .replace(/\s*```$/, ""));
        }
    } else if (getvaleus.return === false) {
        console.log(getvaleus.text);
        return { text:getvaleus.text }
    }
}
export default AItool;