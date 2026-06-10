import { Button } from "./index.js"
import "../styles/Chat.css"

function ChatInput({
  input,
  setInput,
  sendMessage,
  isTyping,
  APP_NAME,
  textareaRef,
  // autoResize,
  handleKeyDown,
  Icon,
}) {
  return (
    <div className="input-area">
      <div className="input-inner">
        <div className="input-box">
          <div className="input-row">
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              placeholder='Message AI Project'
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                // autoResize();
              }}
              onKeyDown={handleKeyDown}
            />

            <Button
              className="send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              title="Send message"
            >
              <Icon.Send />
            </Button>
          </div>
        </div>

        <div className="input-footer">
          AI Project can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}

export default ChatInput;