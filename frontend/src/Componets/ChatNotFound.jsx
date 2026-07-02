import "../styles/notpage.css"

function ChatNotFound() {
  return (
    <div className="chat-error-page">
      <h1 className="chat-error-title">Chat not found</h1>
      <p className="chat-error-message">
        This conversation may have been deleted or the link is invalid.
      </p>
    </div>
  );
}

export default ChatNotFound;