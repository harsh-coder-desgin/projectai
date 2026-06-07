import "./Form.css";

function SkillForm({
  title,
  desc,
  skills,
  selectedSkills,
  handleSkillChange,
  onNext,
  onPrevious,
  onSubmit,
  showPrevious,
  showNext,
  showSubmit,
  currentIcon,
  step,
  totalSteps,
}) {
  return (
    <div className="form-wrap">

      {/* HEADER */}
      <div className="step-card">
        <div className="step-header">
          <div className="step-icon">{currentIcon}</div>

          <div>
            <div className="step-title">{title}</div>
            <div className="step-desc">{desc}</div>
          </div>

          <div className="step-count-badge">
            {step + 1} / {totalSteps}
          </div>
        </div>

        {/* SKILLS */}
        <div className="skill-grid">
          {skills.map((skill) => {

            // ✅ THIS LINE IS HERE
            const isActive = selectedSkills.includes(skill.id);

            return (
              <div
                key={skill.id}
                className={`skill-card ${isActive ? "skill-card--on" : ""}`}
                onClick={() => handleSkillChange(skill)}
              >
                <div className="skill-top">
                  <div className="skill-icon">{skill.icon}</div>

                  <div className="skill-name">{skill.label}</div>

                  <div className={`skill-check ${isActive ? "skill-check--on" : ""}`}>
                    {isActive ? "✓" : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="nav-row">

        <button
          className="btn-prev"
          onClick={onPrevious}
          disabled={!showPrevious}
        >
          Previous
        </button>

        <div className="nav-center">
          <div className="nav-step-text">
            Step {step + 1} of {totalSteps}
          </div>
        </div>

        {showSubmit ? (
          <button
            className="btn-next"
            onClick={onSubmit}
            disabled={selectedSkills.length === 0}
          >
            Next
          </button>
        ) : (
          <button
            className="btn-next"
            onClick={onNext}
            disabled={selectedSkills.length === 0}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default SkillForm;