import { useState, useRef, useEffect } from "react";
import { RecentChatItem, WelcomeScreen, MessageBubble, ChatInput, UserProfile, TypingMessage, Icon, Button } from "../Componets/index.js"
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import chat from "../auth/chat.js"
import auth from "../auth/auth.js"
import "../styles/Chat.css"

// const SUGGESTIONS = [
//   { title: "Give me project idea of Html,css,js", subtitle: "For core pratice" },
//   { title: "Project idea of Backend", subtitle: "To learn" },
// ];


function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  );
}

//no need uper fun
export default function ChatApp() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  //no need if make componet of mainchat

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

   useEffect(() => {
    chat.getAllChats().then((data)=>{
      // console.log(data);
      setChats(data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);

  // const autoResize = () => {
  //   const ta = textareaRef.current;
  //   if (!ta) return;
  //   ta.style.height = "auto";
  //   ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  // };
// console.log(chats);

//no need 
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;
    const data = localStorage.getItem("techSkills")
    if (data && user.username.length !== 0) {
      const saveskills = await chat.saveTech({tech:data})
    }
    let res;
    console.log(user.username);
    if (user.username.length === 0) {
      res = await chat.demoChat({ tech: data, message: text })
    }else{
      res = await chat.sendChat({ message:text,chatId:activeChat })
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
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: res?.data?.response || "Error something wrong"}]);
      chat.getAllChats().then((data)=>{
      setChats(data.data);
      }).catch((err)=>{
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
//no need 
  const handleSuggestion = (title) => {
    setInput(title);
    textareaRef.current?.focus();
  };

  const handleLogout = async () => {
    const res = await auth.logout()
    // localStorage.setItem("techSkills","true")
    setUser({
      username: "",
      email: "",
    });
    navigate("/");

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
          <Button className="icon-btn" onClick={() => setSidebarOpen(false)} title="Close sidebar">
            <Icon.MenuOpen />
          </Button>
        </div>

        <Button className="new-chat-btn" onClick={startNewChat}>
          <Icon.Plus /> New chat
        </Button>

        <div className="sidebar-section-label">Recent</div>

        <div className="sidebar-chats">
          {
            chats.map((chat) => (
              <RecentChatItem
                key={chat.id || chat._id}
                chat={chat}
                activeChat={activeChat}
                loadChat={loadChat}
              />
            ))
          }
        </div>

        <UserProfile
          username={user.username || "User"}
          onLogout={handleLogout}
        />
      </aside>

      {/* ── MAIN ── */}
      <main className="chat-main">
        {/* Topbar */}
       {user.username.length === 0 && <div className="topbar">
          <div className="topbar-left">
            {!sidebarOpen && (
              <button className="icon-btn" onClick={() => setSidebarOpen(true)} title="Open sidebar">
                <Icon.MenuOpen />
              </button>
            )}
            <div className="auth-buttons">
              <Button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                className="signup-btn"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>}
        {/* Messages */}
        <div className="messages-area">
          {messages.length === 0 ? (
            <WelcomeScreen
              // suggestions={SUGGESTIONS}
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
      </main>
    </div>
  );
}