import { useState } from "react";

function AddMoreSkills({ formData, setFormData, onBack, onFinish }) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const newSkills = input
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setFormData((prev) => ({
      ...prev,
      other: [...prev.other, ...newSkills],
    }));

    setInput("");
  };

  return (
    <div className="add-skills">
      <h2>🎯 Add Extra Skills</h2>

      <input
        type="text"
        placeholder="e.g. Python, Go, Rust"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addSkill}>Add Skill</button>

      <h3>Current Other Skills:</h3>
      <p>{formData.other.join(", ")}</p>

      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={onFinish}>Finish & Save</button>
      </div>
    </div>
  );
}

export default AddMoreSkills;