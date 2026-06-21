import { useState } from "react";

function MessageBubble({ msg }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderText = (text) => {
    const parts = text?.split(/(```[\s\S]*?```)/g);
    return parts?.map((part, i) => {
      if (part.startsWith("```")) {
        const code = part?.replace(/^```[^\n]*\n?/, "")?.replace(/```$/, "");
        return <pre key={i}><code>{code}</code></pre>;
      }
      const lines = part?.split("\n").filter(Boolean);
      return lines?.map((line, j) => {
        const bold = line?.replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong>${m}</strong>`);
        return <p key={`${i}-${j}`} dangerouslySetInnerHTML={{ __html: bold }} />;
      });
    });
  };

  return (
    <div className={`message-row ${msg.role}`}>
      <div className={`msg-avatar ${msg.role === "ai" ? "ai" : "user-av"}`}>
        {msg.role === "ai" ? "AI" : "U"}
      </div>
      <div className="msg-content">
        <div className="msg-sender">{msg.role === "ai" ? "AI Project" : "You"}</div>
        <div className="msg-bubble">{renderText(msg.text || msg.content)}</div>
      </div>
    </div>
  );
}
export default MessageBubble;
