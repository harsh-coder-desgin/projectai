import { Icon } from "./index.js"

function RecentChatItem({ chat, activeChat, loadChat }) {
  return (
    <div
      className={`chat-item ${
        activeChat === chat._id ? "active" : ""
      }`}
      onClick={() => loadChat(chat._id)}
    >
      <Icon.Chat />
      <span className="chat-item-text">{chat.title}</span>
    </div>
  );
}

export default RecentChatItem;