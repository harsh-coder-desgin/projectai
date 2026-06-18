function TypingMessage() {
  return (
    <div className="message-row ai">
      <div className="msg-avatar ai">
        AI
      </div>

      <div className="msg-content">
        <div className="msg-sender">
          AI Project
        </div>

        <div className="msg-bubble">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingMessage;