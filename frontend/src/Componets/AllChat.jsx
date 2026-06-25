import { useState, useEffect } from "react";
import { RecentChatItem, UserProfile, Icon, Button,Navbar } from "../Componets/index.js"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import chat from "../auth/chat.js"
import auth from "../auth/auth.js"
import "../styles/Chat.css"

function AllChat() {
    const navigate = useNavigate();
    const { user, setUser,chatdata } = useContext(UserContext);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeChat, setActiveChat] = useState(null);
    const [chats, setChats] = useState([]);

    const startNewChat = () => {
        setActiveChat(null);
        navigate("/chat")
    };

    const handleLogout = async () => {
        try {
            const res = await auth.logout()
        } catch (error) {
            console.log(error);
        }
        setUser({username: "",email: ""});
        navigate("/");
    }

    const loadChat = (id) => {    
        setActiveChat(id);
        navigate(`/chat/${id}`)
    };

    useEffect(() => {
        if (chats?.length === 0) {
            chat.getAllChats().then((data) => {                
                setChats(data.data);
            }).catch((err) => {
                console.log(err);
            })
        }else{
            setChats((prev)=>[chatdata,...prev])
            setActiveChat(chatdata.chatId)
        }
    }, [chatdata]);
    return (
        <div>
           {!sidebarOpen && <div className="btn-open">
            <Button className="icon-btn" onClick={() => setSidebarOpen(true)} title="Close sidebar">
                        <Icon.MenuOpen />
                    </Button>
            </div> }
            <div className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
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
                        chats?.map((chat,index) => (
                            <RecentChatItem
                            key={index}
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
            </div>
        </div>
    )
}

export default AllChat
