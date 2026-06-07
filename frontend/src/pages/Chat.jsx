import { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { RecentChatItem, WelcomeScreen, MessageBubble, ChatInput } from "../Componets/index.js"

const Icon = {
  Sparkle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275z" />
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5v14" />
    </svg>
  ),
  MenuOpen: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" />
    </svg>
  ),
  Chat: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Send: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Stop: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  ),
  Copy: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  ThumbUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11z" />
    </svg>
  ),
  ThumbDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  Refresh: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />
    </svg>
  ),
  Attach: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  Globe: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  ),
  Image: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Share: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  ),
};

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

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">U</div>
            <div>
              <div className="user-name">User</div>
              <div className="user-plan">Free plan</div>
            </div>
          </div>
        </div>
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
                <div className="message-row ai">
                  <div className="msg-avatar ai">AI</div>
                  <div className="msg-content">
                    <div className="msg-sender">AI Project</div>
                    <div className="msg-bubble">
                      <TypingIndicator />
                    </div>
                  </div>
                </div>
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