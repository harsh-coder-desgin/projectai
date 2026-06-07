import { useState } from "react";
import { skillCategories, AddOtherSkills ,SkillForm } from "../Componets/index.js";

function TechForm() {
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

      const exists = list.includes(skill.id);

      const updated = exists
        ? list.filter((id) => id !== skill.id)
        : [...list, skill.id];

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
    console.log("Step 1 Saved:", formData);
    setShowExtraForm(true);
  };

  const handleFinalSubmit = (extraSkills) => {
    const finalData = {
      ...formData,
      other: [...formData.other, ...extraSkills],
    };
    localStorage.setItem("techSkills", JSON.stringify(finalData));
    console.log("FINAL SAVED DATA:");
    console.log(finalData);
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
  );
}

export default TechForm;