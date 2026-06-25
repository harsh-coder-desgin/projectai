import { useState } from "react";
import { skillCategories, AddOtherSkills, SkillForm } from "../Componets/index.js";
import { useNavigate } from "react-router-dom";

function TechForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showExtraForm, setShowExtraForm] = useState(false);
  const [formData, setFormData] = useState({
    frontend: [],
    backend: [],
    database: [],
    other: [],
  });

  const currentForm = skillCategories[step];

  const handleSkillChange = (skill) => {
    setFormData((prev) => {
      const list = prev[currentForm.id];
      if (skill.id === "None") {
        const exists = list.includes("None");

        return {
          ...prev,
          [currentForm.id]: exists ? [] : ["None"],
        };
      }

      const newList = list.filter((id) => id !== "None");
      const exists = newList.includes(skill.id);
      const updated = exists
        ? newList.filter((id) => id !== skill.id)
        : [...newList, skill.id];

      return {
        ...prev,
        [currentForm.id]: updated,
      };
    });
  };
  
  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setShowExtraForm(true);
  };

  const handleFinalSubmit = (extraSkills) => {
    const finalData = {
      ...formData,
      other: [...formData.other, ...extraSkills],
    };
    localStorage.setItem("techSkills", JSON.stringify(finalData));
    navigate("/chat")
  };

  if (showExtraForm) {
    return (
      <AddOtherSkills
        existingSkills={formData.other}
        onBack={() => setShowExtraForm(false)}
        onSubmit={handleFinalSubmit}
      />
    );
  }

  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <h1
          style={{
            fontSize: "clamp(1.5rem, 2vw, 2rem)",
            fontWeight: "400",
            textAlign: "center",
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}>
          Choose Your Tech Stack
        </h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "1.1rem",
            color: "#94a3b8",
            maxWidth: "650px",
            marginLeft: "450px",
            lineHeight: "1.6",
          }}>
          Select your technology to continue and generate AI-powered project ideas.
        </p>
      </div>
      <SkillForm
        title={currentForm.label}
        desc={currentForm.desc}
        skills={currentForm.skills}
        selectedSkills={formData[currentForm.id]}
        handleSkillChange={handleSkillChange}
        showPrevious={step > 0}
        showNext={step < skillCategories.length - 1}
        showSubmit={step === skillCategories.length - 1}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        currentIcon={currentForm.icon}
        step={step}
        totalSteps={skillCategories.length}
      />
    </>
  );
}

export default TechForm;