import { Icon } from "./index.js"

function RecentChatItem({ chat, activeChat, loadChat }) {
  return (
    <div
      className={`chat-item ${
        activeChat === chat.id ? "active" : ""
      }`}
      onClick={() => loadChat(chat.id)}
    >
      <Icon.Chat />
      <span className="chat-item-text">{chat.title}</span>
    </div>
  );
}

export default RecentChatItem;