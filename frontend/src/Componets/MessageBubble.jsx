import { useState } from "react";

function MessageBubble(msg) {
  console.log(msg);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.text).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderText = (text) => {
    console.log(text.msg.content, "d");

    // console.log(text);
    // const parts = text?.split(/(```[\s\S]*?```)/g);
    return text.msg.content.text
  };

  let aiData = null;

  if (msg.msg.role === "ai") {
    try {
      //   if (typeof msg.content === 'string') {
      aiData = msg.msg
      //   }else{
      //     aiData = msg
      //   //   aiData = JSON?.parse(msg.content);
      // }

    } catch (err) {
      console.log(err);
      aiData = null;
    }
  }

  return (
    <div className={`message-row ${msg.msg.role}`}>
      <div
        className={`msg-avatar ${msg.msg.role === "ai" ? "ai" : "user-av"
          }`}
      >
        {msg.msg.role === "ai" ? "AI" : "U"}
      </div>

      <div className="msg-content">
        <div className="msg-sender">
          {msg.msg.role === "ai" ? "AI Project" : "You"}
        </div>

        <div className="msg-bubble">
          {msg.msg.role === "ai" ? (
            <>
              {/* {aiData?.content && (
                <>
                  <p>{aiData?.content}</p>
                </>
              )} */}

              <div style={{ color: "#f3f4f6", lineHeight: 1.8 }}>

                {aiData?.content?.text && (
                  <p
                    style={{
                      background: "#1f2937",
                      padding: "15px",
                      borderRadius: "10px",
                      marginBottom: "20px",
                      color: "#d1d5db",
                    }}
                  >
                    {aiData.content.text}
                  </p>
                )}

                {aiData?.content?.project_title && (
                  <h2
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      marginBottom: "10px",
                      color: "#fff",
                    }}
                  >
                    {aiData.content.project_title}
                  </h2>
                )}

                {aiData?.content?.project_description && (
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#cbd5e1",
                      marginBottom: "25px",
                    }}
                  >
                    {aiData.content.project_description}
                  </p>
                )}

                {/* Key Features */}

                {aiData?.content?.key_features?.length > 0 && (
                  <div style={{ marginBottom: "25px" }}>
                    <h3
                      style={{
                        borderLeft: "5px solid #3b82f6",
                        paddingLeft: "10px",
                      }}
                    >
                      🎯Features
                    </h3>

                    <ul>
                      {aiData.content.key_features.map((item, index) => (
                        <li key={index} style={{ margin: "8px 0" }}>
                          ✅ {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Security */}

                {aiData?.content?.security_considerations?.length > 0 && (
                  <div style={{ marginBottom: "25px" }}>
                    <h3
                      style={{
                        borderLeft: "5px solid #ef4444",
                        paddingLeft: "10px",
                      }}
                    >
                      🔒 Security Considerations
                    </h3>

                    <ul>
                      {aiData.content.security_considerations.map((item, index) => (
                        <li key={index} style={{ margin: "8px 0" }}>
                          🛡 {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Feature Groups */}

                {aiData?.content?.feature_group?.length > 0 && (
                  <div style={{ marginBottom: "25px" }}>
                    <h3
                      style={{
                        borderLeft: "5px solid orange",
                        paddingLeft: "10px",
                      }}
                    >
                      📑 Main Features
                    </h3>

                    <ul>
                      {aiData.content.feature_group.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Features */}

                {aiData?.content?.features?.length > 0 && (
                  <>
                    <h3
                      style={{
                        borderLeft: "5px solid #8b5cf6",
                        paddingLeft: "10px",
                      }}
                    >
                      📋 Detailed Features
                    </h3>

                    {aiData.content.features.map((value, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#1f2937",
                          padding: "15px",
                          borderRadius: "10px",
                          marginBottom: "15px",
                        }}
                      >
                        <h4
                          style={{
                            marginBottom: "10px",
                            color: "#60a5fa",
                          }}
                        >
                          {value.group}
                        </h4>

                        <ul>
                          {value.item.map((feature, i) => (
                            <li key={i}>✔ {feature}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </>
                )}

                {/* Technology Stack */}

                <div style={{ marginTop: "25px" }}>
                  <h3
                    style={{
                      borderLeft: "4px solid #4f46e5",
                      paddingLeft: "10px",
                      marginBottom: "12px",
                    }}
                  >
                    💻 Technology Stack
                  </h3>

                  <ul style={{ paddingLeft: "20px" }}>
                    {[
                      ["Frontend", aiData?.content?.technology_stack?.frontend],
                      ["Backend", aiData?.content?.technology_stack?.backend],
                      ["Database", aiData?.content?.technology_stack?.database],
                      ["Other", aiData?.content?.technology_stack?.other],
                    ].map(
                      ([title, data]) =>
                        data?.length > 0 && (
                          <li key={title} style={{ marginBottom: "8px" }}>
                            <strong>{title}:</strong> {data.join(", ")}
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            renderText(msg)
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;