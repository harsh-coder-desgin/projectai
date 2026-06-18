import { useState, useRef, useEffect } from "react";
import { WelcomeScreen, MessageBubble, ChatInput, TypingMessage, Icon, Button } from "./index.js"
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
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

// const SUGGESTIONS = [
//   { title: "Give me project idea of Html,css,js", subtitle: "For core pratice" },
//   { title: "Project idea of Backend", subtitle: "To learn" },
// ];

function MainChat({ activeChat = '', setChats = [], chats = '' }) {
    // here i want activechat state and setChats state also
    const { user, setUser } = useContext(UserContext);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || isTyping) return;
        const data = localStorage.getItem("techSkills")
        if (data && user.username.length !== 0) {
            const saveskills = await chat.saveTech({ tech: data })
        }
        let res;
        if (user.username.length === 0) {
            res = await chat.demoChat({ tech: data, message: text })
        } else {
            res = await chat.sendChat({ message: text, chatId: activeChat })
            if (res) {
                setActiveChat(res.data.chatId);
            }
        }

        const userMsg = { id: Date.now(), role: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";

        if (!activeChat) {
            const newChat = { id: Date.now(), title: text.slice(0, 36) + (text.length > 36 ? "…" : "") };
            setChats((prev) => [newChat, ...prev]);
        }

        setIsTyping(true);
        const delay = 1000 + Math.random() * 1200;

        setTimeout(() => {
            setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: res?.data?.response || "Error something wrong" }]);
            chat.getAllChats().then((data) => {
                setChats(data.data);
            }).catch((err) => {
                console.log(err);
            })
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
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    return (
        <div>
            <>
                {messages.length === 0 &&
                    <WelcomeScreen
                        // suggestions={SUGGESTIONS}
                        handleSuggestion={handleSuggestion}
                    />
                }
            </>
            <div className="messages-area">
                <div className="messages-inner">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} msg={msg} />
                    ))}
                    {isTyping && (
                        <TypingMessage
                            appName="AI Project"
                        />
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            {isTyping && (
                <Button className="stop-btn" onClick={() => setIsTyping(false)}>
                    <Icon.Stop /> Stop generating
                </Button>
            )}

            <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                isTyping={isTyping}
                textareaRef={textareaRef}
                // autoResize={autoResize}
                handleKeyDown={handleKeyDown}
                Icon={Icon} />
        </div>
    )
}

export default MainChat
