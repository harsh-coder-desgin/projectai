const Icon = {
  Chat: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
};

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