import { useState, useRef, useEffect } from "react";
import { RecentChatItem, WelcomeScreen, MessageBubble, ChatInput, UserProfile, TypingMessage, Icon, Button } from "../Componets/index.js"
import chat from "../auth/chat.js"
import auth from "../auth/auth.js"
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

function MainChat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || isTyping) return;
        const data = localStorage.getItem("techSkills")
        if (data && user.username.length !== 0) {
            const saveskills = await chat.saveTech({ tech: data })
        }
        let res;
        console.log(user.username);
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

    //no need 
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
        <div>        <div className="messages-area">

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

            {/* Input */}
            <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                isTyping={isTyping}
                textareaRef={textareaRef}
                // autoResize={autoResize}
                handleKeyDown={handleKeyDown}
                Icon={Icon}
            />
        </div>
    )
}

export default MainChat
