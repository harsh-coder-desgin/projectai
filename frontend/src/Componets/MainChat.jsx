import { useState, useRef } from "react";
import { WelcomeScreen, ChatInput, Icon, Button } from "./index.js"
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import chat from "../auth/chat.js"
import "../styles/Chat.css"

function TypingIndicator() {
    return (
        <div className="typing-indicator">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
        </div>
    );
}

const SUGGESTIONS = [
  {
    title: "Suggest me a unique AI project idea",
    subtitle: "Build something innovative"
  },
  {
    title: "Suggest beginner friendly projects",
    subtitle: "Improve my coding skills"
  },
  {
    title: "Suggest an AI agent project",
    subtitle: "Build smart automation tools"
  },
  {
    title: "Give me startup ideas using AI",
    subtitle: "Create real-world products"
  }
];

function MainChat({ activeChat, setActiveChat, setChats, Typing, setMessages, setIsTyping, welcome,chatid }) {
    const navigate = useNavigate();
    const location = useLocation();
    const textareaRef = useRef(null);
    const { user, setUser,chatdata,setchatdata } = useContext(UserContext);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || Typing) return;
        const data = localStorage.getItem("techSkills")
        if (data && user.username.length !== 0) {
            const saveskills = await chat.saveTech({ tech: data })
        }
        let res;
        if (user.username.length === 0) {
            res = await chat.demoChat({ tech: data, message: text })
        } else {
            res = await chat.sendChat({ message: text, chatId: chatid || null })
            if (res) {
                if (location.pathname === "/chat") {
                    setchatdata({chatId:res.data.chatId,title: text,_id: res.data._id})
                    navigate(`/chat/${res.data.chatId}`)
                }
            }
        }

        const userMsg = { id: Date.now(), role: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";        

        setIsTyping(true);
        const delay = 1000 + Math.random() * 1200;

        setTimeout(() => {
            setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: res?.data?.response || "Error something wrong" }]);
            setIsTyping(false);
        }, delay);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleSuggestion = (title) => {
        setInput(title);
        textareaRef.current?.focus();
    };

    return (
        <>
            {welcome === 0 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "150px",
                    }}>
                    <WelcomeScreen
                        suggestions={SUGGESTIONS}
                        handleSuggestion={handleSuggestion}
                    />
                </div>
            )}

            {Typing && (
                <Button className="stop-btn" onClick={() => setIsTyping(false)}>
                    <Icon.Stop /> Stop generating
                </Button>
            )}

            <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                isTyping={Typing}
                textareaRef={textareaRef}
                // autoResize={autoResize}
                handleKeyDown={handleKeyDown}
                Icon={Icon} 
            />
        </>
    )
}

export default MainChat
