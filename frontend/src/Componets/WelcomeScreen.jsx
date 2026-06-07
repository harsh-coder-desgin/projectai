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
          <button
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
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeScreen;