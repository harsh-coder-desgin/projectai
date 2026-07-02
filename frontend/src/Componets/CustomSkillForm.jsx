import { useState } from "react";
import { Button, Input, skillCategories } from "./index.js"

function AddOtherSkills({ onBack, onSubmit }) {
  const [input, setInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  const addSkills = () => {
    const existingSkills = skillCategories.flatMap((category) =>
      category.skills.map((skill) => skill.label.toLowerCase())
    );

    const enteredSkills = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const duplicates = enteredSkills.filter(
      (skill) =>
        existingSkills.includes(skill.toLowerCase()) ||
        skills.some((s) => s.toLowerCase() === skill.toLowerCase())
    );

    let validSkills = enteredSkills.filter(
      (skill) =>
        !existingSkills.includes(skill.toLowerCase()) &&
        !skills.some((s) => s.toLowerCase() === skill.toLowerCase())
    );

    const remainingSlots = 15 - skills.length;

    if (remainingSlots <= 0) {
      setError("Maximum 15 skills allowed");
      return;
    }

    if (validSkills.length > remainingSlots) {
      validSkills = validSkills.slice(0, remainingSlots);
      setError(`Only ${remainingSlots} more skills can be added`);
    } else if (duplicates.length > 0) {
      setError(`${duplicates.join(", ")} already exists`);
    } else {
      setError("");
    }

    setSkills((prev) => [...prev, ...validSkills]);
    setInput("");
  };
  const handleFinal = () => {
    onSubmit(skills);
  };

  return (
    <div className="form-wrap">

      <div className="step-card">
        <h2>➕ Add Custom Skills (Other)</h2>

        <Input
          type="text"
          placeholder="e.g. Python, AI, Blockchain"
          value={input}
          maxLength={30}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={addSkills} className="btn-add" >Add</Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
        <Button className="btn-prev" onClick={onBack}>
          Back
        </Button>

        <Button className="btn-submit" onClick={handleFinal}>
          Final Submit
        </Button>
      </div>
    </div>
  );
}

export default AddOtherSkills;