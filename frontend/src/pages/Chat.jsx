import { useState, useRef, useEffect } from "react";
import { RecentChatItem, UserProfile, TypingMessage, Icon, Button, MainChat,Navbar } from "../Componets/index.js"
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import chat from "../auth/chat.js"
import auth from "../auth/auth.js"
import "../styles/Chat.css"

export default function ChatApp() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    chat.getAllChats().then((data)=>{
      setChats(data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);

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

  const handleLogout = async () => {
    const res = await auth.logout()
    // localStorage.setItem("techSkills","true")
    setUser({
      username: "",
      email: "",
    });
    navigate("/");

  };

  const isMobile = () => window.innerWidth <= 640;

  return (
    <div className="chat-app">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen && isMobile() ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}/>

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
       {user.username.length === 0 && <Navbar sidebar={sidebarOpen} setSidebarOpen={setSidebarOpen}/>}

        {/* Messages */}
        <div className="messages-area">
          <MainChat setActiveChat={setActiveChat} setChats={setChats} activeChat={activeChat} messages={messages} setMessages={setMessages}/> 
        </div>

      </main>
    </div>
  );
}