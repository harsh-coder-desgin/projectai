import { Button } from "./index.js"

function WelcomeScreen({
  suggestions,
  handleSuggestion,
}) {
  return (
    <div className="welcome-screen">
      <div className="welcome-logo">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 12h10M12 7v10"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h1 className="welcome-title">
        What can I help with?
      </h1>

      <div className="welcome-suggestions">
        {suggestions.map((s, i) => (
          <Button
            key={i}
            className="suggestion-card"
            onClick={() => handleSuggestion(s.title)}
          >
            <div className="suggestion-title">
              {s.title}
            </div>

            <div className="suggestion-subtitle">
              {s.subtitle}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeScreen;