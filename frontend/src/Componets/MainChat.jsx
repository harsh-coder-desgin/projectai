import React, { useState, useRef, useContext, useCallback} from "react";
import { WelcomeScreen, ChatInput, Icon } from "./index.js"
import { UserContext } from "../Context/UserContext.jsx";
import { useLocation ,useNavigate } from "react-router-dom";
import chat from "../auth/chat.js"
import "../styles/Chat.css"

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

const MainChat = React.memo(function MainChat({ Typing, setMessages, setIsTyping, welcome,chatid }){
    const navigate = useNavigate();
    const location = useLocation();
    const textareaRef = useRef(null);
    const { user,setchatdata } = useContext(UserContext);
    const [input, setInput] = useState("");
    
    const sendMessage = async () => {
        setInput("");
        setIsTyping(true);
        const delay = 1000 + Math.random() * 1200;        
        const text = input.trim();
        const userMsg = { id: Date.now(), role: "user", content:{ text:text } };
        setMessages((prev) => [...prev, userMsg]);
        if (textareaRef.current) textareaRef.current.style.height = "auto";    
        if (!text || Typing) return;
        let res;
        if (user.username.length === 0) {
            try {
                res = await chat.demoChat({ message: text })
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                res = await chat.sendChat({ message: text, chatId: chatid || null })
            } catch (error) {
                console.log(error);
            }
            if (res) {
                if (location.pathname === "/chat") {
                    setchatdata({ chatId:res.data.chatId,title: text })
                    navigate(`/chat/${res.data.chatId}`)
                }
            }
        }    
        setTimeout(() => {
            setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", content: res?.data?.aires || "Error something wrong" }]);
            setIsTyping(false);
        }, delay);
    };
    
    const handleKeyDown = (e) => {        
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!input.trim() === false && !Typing) {
                sendMessage();
            }
        }
    };
    
    const handleSuggestion = useCallback((title) => {
        setInput(title);
        textareaRef.current?.focus();
    }, []);
    
    return (
        <>
            {welcome === 0 && (
                <div style={{
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

            <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                isTyping={Typing}
                textareaRef={textareaRef}
                handleKeyDown={handleKeyDown}
                Icon={Icon} 
            />
        </>
    )
}) 

export default MainChat
