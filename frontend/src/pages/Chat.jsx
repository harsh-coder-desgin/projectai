import { useState, useRef, useEffect } from "react";
import "../styles/Chat.css"
import { RecentChatItem, WelcomeScreen, MessageBubble, ChatInput, UserProfile, TypingMessage ,Icon } from "../Componets/index.js"

// const APP_NAME = "AI Project";

const CHAT_HISTORY = [
  { id: 1, title: "React component architecture" },
  { id: 2, title: "Python data analysis tips" },
  { id: 3, title: "CSS Grid vs Flexbox" },
  { id: 4, title: "JWT authentication flow" },
  { id: 5, title: "Docker setup guide" },
];

const SUGGESTIONS = [
  { title: "Explain quantum computing", subtitle: "in simple terms" },
  { title: "Write a Python script", subtitle: "to scrape web data" },
  { title: "Debug my React app", subtitle: "help fix common errors" },
  { title: "Plan a trip to Japan", subtitle: "for 10 days in spring" },
];

const AI_RESPONSES = [
  "Sure! Here's a clear explanation of that concept.\n\nThe key idea is to break the problem into smaller, manageable pieces. Each piece handles a specific responsibility, making the overall system easier to understand and maintain.\n\nHere's a quick example:\n```js\nconst result = items\n  .filter(x => x.active)\n  .map(x => x.value);\n```\n\nThis pattern is widely used in modern development because it keeps logic clean and testable.",
  "Great question! There are several approaches you can take here.\n\n1. **Option A** — Simple and straightforward, works well for small projects.\n2. **Option B** — More scalable, better for larger codebases.\n3. **Option C** — Best performance, but requires more setup.\n\nFor most use cases, I'd recommend starting with Option A and migrating as your needs grow.",
  "I can help with that! Let me walk you through the key points step by step.\n\nFirst, understand the core concept. Then apply it in a controlled environment. Finally, iterate based on real feedback.\n\nWould you like me to dive deeper into any specific part?",
  "Absolutely! Here's a concise breakdown:\n\n- **Performance**: Optimized for speed with lazy loading.\n- **Scalability**: Designed to handle millions of requests.\n- **Developer experience**: Clean API with great documentation.\n\nLet me know if you need code examples or further details.",
];


function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  );
}

export default function ChatApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chats, setChats] = useState(CHAT_HISTORY);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // const autoResize = () => {
  //   const ta = textareaRef.current;
  //   if (!ta) return;
  //   ta.style.height = "auto";
  //   ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  // };

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    if (!activeChat) {
      const newChat = { id: Date.now(), title: text.slice(0, 36) + (text.length > 36 ? "…" : "") };
      setChats((prev) => [newChat, ...prev]);
      setActiveChat(newChat.id);
    }

    setIsTyping(true);
    const delay = 1000 + Math.random() * 1200;
    setTimeout(() => {
      const aiText = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: aiText }]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    setActiveChat(null);
    setMessages([]);
    setIsTyping(false);
  };

  const loadChat = (id) => {
    setActiveChat(id);
    setMessages([]);
    if (window.innerWidth <= 640) setSidebarOpen(false);
  };

  const handleSuggestion = (title) => {
    setInput(title);
    textareaRef.current?.focus();
  };

  const handleLogout = () => {

  }

  const isMobile = () => window.innerWidth <= 640;

  return (
    <div className="chat-app">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen && isMobile() ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── SIDEBAR ── */}
      <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            AI Project
          </div>
          <button className="icon-btn" onClick={() => setSidebarOpen(false)} title="Close sidebar">
            <Icon.MenuOpen />
          </button>
        </div>

        <button className="new-chat-btn" onClick={startNewChat}>
          <Icon.Plus /> New chat
        </button>

        <div className="sidebar-section-label">Recent</div>

        <div className="sidebar-chats">
          {
            chats.map((chat) => (
              <RecentChatItem
                key={chat.id}
                chat={chat}
                activeChat={activeChat}
                loadChat={loadChat}
              />
            ))
          }
        </div>

        <UserProfile
          username="Harsh"
          onLogout={handleLogout}
        />
      </aside>

      {/* ── MAIN ── */}
      <main className="chat-main">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-left">
            {!sidebarOpen && (
              <button className="icon-btn" onClick={() => setSidebarOpen(true)} title="Open sidebar">
                <Icon.MenuOpen />
              </button>
            )}
          </div>
        </div>
        {/* Messages */}
        <div className="messages-area">
          {messages.length === 0 ? (
            <WelcomeScreen
              suggestions={SUGGESTIONS}
              handleSuggestion={handleSuggestion}
            />
          ) : (
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
          )}
        </div>

        {/* Stop generating */}
        {isTyping && (
          <button className="stop-btn" onClick={() => setIsTyping(false)}>
            <Icon.Stop /> Stop generating
          </button>
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
      </main>
    </div>
  );
}