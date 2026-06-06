import { useState } from "react";
import "./SkillForm.css";

const SKILLS = [
  { id: "html", label: "HTML", icon: "🟧" },
  { id: "css", label: "CSS", icon: "🟦" },
  { id: "js", label: "JavaScript", icon: "🟨" },
  { id: "ts", label: "TypeScript", icon: "🔷" },
  { id: "react", label: "React", icon: "⚛️" },
  { id: "vue", label: "Vue.js", icon: "🟩" },
  { id: "angular", label: "Angular", icon: "🔴" },
  { id: "tailwind", label: "Tailwind CSS", icon: "🌊" },
  { id: "nextjs", label: "Next.js", icon: "▲" },
  { id: "sass", label: "Sass / SCSS", icon: "🎨" },
];

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function FrontendForm({ selected, onChange, onNext }) {
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
        <span className="card-icon">🖥️</span>
        <div>
          <h2 className="card-title">Frontend</h2>
          <p className="card-desc">UI & styling technologies</p>
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
        <span />
        <button className="btn-next" onClick={onNext}>Next →</button>
      </div>
    </div>
  );
}