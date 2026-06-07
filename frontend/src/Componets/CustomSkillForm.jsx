import { useState } from "react";

function AddOtherSkills({ onBack, onSubmit }) {
  const [input, setInput] = useState("");
  const [skills, setSkills] = useState([]);

  const addSkills = () => {
    const newSkills = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setSkills((prev) => [...prev, ...newSkills]);
    setInput("");
  };
  const handleFinal = () => {
    onSubmit(skills);
  };

  return (
    <div className="form-wrap">

      <div className="step-card">
        <h2>➕ Add Custom Skills (Other)</h2>

        <input
          type="text"
          placeholder="e.g. Python, AI, Blockchain"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addSkills} className="btn-add" >Add</button>
        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {skills.map((s, i) => (
            <span
              key={i}
              style={{
                background: "#f1f5f9",
                padding: "6px 10px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#1e293b",
                border: "1px solid #cbd5e1",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              ⭐ {s}
            </span>
          ))}
        </div>
      </div>

      <div className="nav-row">
        <button className="btn-prev" onClick={onBack}>
          Back
        </button>

        <button className="btn-submit" onClick={handleFinal}>
          Final Submit
        </button>
      </div>
    </div>
  );
}

export default AddOtherSkills;