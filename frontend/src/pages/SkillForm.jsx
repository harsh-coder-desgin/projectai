import "./SkillForm.css";

function SkillForm({
  title,
  skills,
  selectedSkills,
  handleSkillChange,
  onNext,
  onPrevious,
  onSubmit,
  showPrevious,
  showNext,
  showSubmit,
}) {
  return (
    <div className="skill-form">
      <h2>{title}</h2>

      <div className="skills-container">
        {skills.map((skill) => (
          <label key={skill} className="skill-item">
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill)}
              onChange={() => handleSkillChange(skill)}
            />
            {skill}
          </label>
        ))}
      </div>

      <div className="btn-container">
        {showPrevious && (
          <button onClick={onPrevious}>
            Previous
          </button>
        )}

        {showNext && (
          <button onClick={onNext}>
            Next
          </button>
        )}

        {showSubmit && (
          <button onClick={onSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default SkillForm;