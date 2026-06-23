import { Outlet } from "react-router-dom";
import { AllChat } from "../Componets/index.js";

function ChatLayout() {
  return (
    <div className="chat-layout">
      <AllChat />
      <div className="chat-area">
        <Outlet />
      </div>
    </div>
  );
}

export default ChatLayout;