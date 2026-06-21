import { useState, useRef, useEffect } from "react";
import { RecentChatItem, MessageBubble, UserProfile, TypingMessage, Icon, Button, MainChat,Navbar } from "../Componets/index.js"
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import chat from "../auth/chat.js"
import auth from "../auth/auth.js"
import "../styles/Chat.css"

export default function Chat({olddata}) {
  console.log(olddata);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(olddata || []);
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  console.log(messages,"here");
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    chat.getAllChats().then((data) => {
      setChats(data.data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);
  
  useEffect(()=>{
    console.log(olddata);
    
    if (olddata && olddata.length > 0) {
      setMessages(olddata);
    }
  },[olddata])

  const startNewChat = () => {
    setActiveChat(null);
    setMessages([]);
    setIsTyping(false);
  };

  const loadChat = (id) => {    
    setActiveChat(id);
    setMessages([]);
    if (window.innerWidth <= 640) setSidebarOpen(false);
    navigate(`/chat/${id}`)
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
      <div className={`sidebar-overlay ${sidebarOpen && isMobile() ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}/>

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

      <main className="chat-main">
        {user.username.length === 0 && <Navbar setSidebarOpen={setSidebarOpen} sidebar={sidebarOpen}/>}
        <div className="messages-area">
          {messages.length !== 0 && (
            <div className="messages-inner">
              {messages.map((msg) => (
                <MessageBubble key={msg._id} msg={msg} />
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
        <MainChat
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          setChats={setChats}
          Typing={isTyping}
          setMessages={setMessages}
          setIsTyping={setIsTyping}
          welcome={messages.length}
        />
      </main>
    </div>
  );
}