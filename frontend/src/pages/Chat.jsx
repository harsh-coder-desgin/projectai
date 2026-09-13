import { useState, useRef, useEffect,useContext } from "react";
import { MessageBubble, TypingMessage, MainChat, Navbar } from "../Componets/index.js"
import { UserContext } from "../Context/UserContext.jsx";
import "../styles/Chat.css"

const Chat = ({ olddata, chatid }) => {  
  const messagesEndRef = useRef(null);
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState(olddata || []);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (olddata && olddata.length > 0) {
      setMessages(olddata);      
    }
  }, [olddata])

  const isMobile = () => window.innerWidth <= 640;

  return (
    <>
      <div className="chat-app">
        <main className="chat-main">
          {user.username.length === 0 && <Navbar />}
          <div className="messages-area">
            {messages.length !== 0 && (
              <div className="messages-inner">
                {messages?.map((msg, index) => (
                  <div key={index}>
                    <MessageBubble msg={msg} />
                  </div>
                ))}
                {isTyping && (
                  <TypingMessage/>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          <MainChat
            chatid={chatid}
            Typing={isTyping}
            setMessages={setMessages}
            setIsTyping={setIsTyping}
            welcome={messages.length}
          />
        </main>
      </div>
    </>
  );
}
export default Chat;