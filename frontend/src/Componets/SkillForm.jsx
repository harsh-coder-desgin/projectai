import "../styles/Form.css"
import { Button } from "./index.js"

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

        <div className="skill-grid">
          {skills.map((skill) => {
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

        <Button
          className="btn-prev"
          onClick={onPrevious}
          disabled={!showPrevious}>
          Previous
        </Button>

        <div className="nav-center">
          <div className="nav-step-text">
            Step {step + 1} of {totalSteps}
          </div>
        </div>

        {showSubmit ? (
          <Button
            className="btn-next"
            onClick={onSubmit}
            disabled={selectedSkills.length === 0}>
            Next
          </Button>
        ) : (
          <Button
            className="btn-next"
            onClick={onNext}
            disabled={selectedSkills.length === 0}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default SkillForm;