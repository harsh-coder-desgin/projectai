import "./SkillForm.css";

const SKILLS = [
  { id: "git", label: "Git", icon: "🌿" },
  { id: "docker", label: "Docker", icon: "🐳" },
  { id: "aws", label: "AWS", icon: "☁️" },
  { id: "linux", label: "Linux", icon: "🐧" },
  { id: "ci", label: "CI/CD", icon: "♾️" },
  { id: "kubernetes", label: "Kubernetes", icon: "⚙️" },
  { id: "nginx", label: "Nginx", icon: "🌐" },
  { id: "vercel", label: "Vercel", icon: "▲" },
];

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function DevOpsForm({ selected, onChange, onSubmit, onPrev, totalSelected }) {
  const toggle = (id) => {
    const copy = { ...selected };
    if (copy[id]) delete copy[id];
    else copy[id] = "Beginner";
    onChange(copy);
  };

  const setLevel = (id, level) => onChange({ ...selected, [id]: level });

  const count = SKILLS.filter((s) => selected[s.id]).length;

  return (
    <div className="form-card">
      <div className="card-header">
        <span className="card-icon">☁️</span>
        <div>
          <h2 className="card-title">DevOps & Cloud</h2>
          <p className="card-desc">Infrastructure & deployment</p>
        </div>
        <span className="count-badge">{count} selected</span>
      </div>

      <div className="skill-grid">
        {SKILLS.map((skill) => {
          const isOn = !!selected[skill.id];
          return (
            <div key={skill.id} className={`skill-card ${isOn ? "skill-card--on" : ""}`}>
              <div className="skill-top" onClick={() => toggle(skill.id)}>
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.label}</span>
                <span className={`skill-check ${isOn ? "skill-check--on" : ""}`}>
                  {isOn ? "✓" : "+"}
                </span>
              </div>
              {isOn && (
                <div className="level-row">
                  {LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      className={`lvl-btn ${selected[skill.id] === lvl ? "lvl-btn--active" : ""}`}
                      onClick={() => setLevel(skill.id, lvl)}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="card-footer">
        <button className="btn-prev" onClick={onPrev}>← Previous</button>
        <button
          className={`btn-submit ${totalSelected === 0 ? "btn-submit--disabled" : ""}`}
          onClick={onSubmit}
          disabled={totalSelected === 0}
        >
          Save profile ✓
        </button>
      </div>
    </div>
  );
}