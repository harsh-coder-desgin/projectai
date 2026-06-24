import { Outlet } from "react-router-dom";
import { AllChat } from "../Componets/index.js";
import  "../App.css"

function ChatLayout() {
  return (
    <div className="chat-layout">
      <aside className="all-chat">
        <AllChat />
      </aside>
      <main className="chat-area">
        <Outlet />
      </main>
    </div>
  );
}

export default ChatLayout;