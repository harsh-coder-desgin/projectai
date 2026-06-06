import { useState } from "react";
import SkillForm from "./SkillForm";
import AddMoreSkills from "./CustomSkillForm";

function TechForm() {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    frontend: [],
    backend: [],
    database: [],
    other: [],
  });

  const forms = [
    {
      key: "frontend",
      title: "Frontend Skills",
      skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
    },
    {
      key: "backend",
      title: "Backend Skills",
      skills: ["Node.js", "Express", "JWT", "REST API"],
    },
    {
      key: "database",
      title: "Database Skills",
      skills: ["MongoDB", "MySQL", "PostgreSQL"],
    },
    {
      key: "other",
      title: "Other Skills",
      skills: ["Docker", "AWS", "GitHub Actions", "Nginx"],
    },
  ];

  const currentForm = forms[step];

  const handleSkillChange = (skill) => {
    setFormData((prev) => {
      const list = prev[currentForm.key];

      const updated = list.includes(skill)
        ? list.filter((s) => s !== skill)
        : [...list, skill];

      return {
        ...prev,
        [currentForm.key]: updated,
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
    localStorage.setItem("techSkills", JSON.stringify(formData));
    console.log("FINAL DATA:", formData);
    setStep(4); 
  };

  if (step === 4) {
    return (
      <AddMoreSkills
        formData={formData}
        setFormData={setFormData}
        onBack={() => setStep(3)}
        onFinish={() => {
          localStorage.setItem("techSkills", JSON.stringify(formData));
          console.log("FINAL SAVED:", formData);
        }}
      />
    );
  }

  return (
    <SkillForm
      title={currentForm.title}
      skills={currentForm.skills}
      selectedSkills={formData[currentForm.key]}
      handleSkillChange={handleSkillChange}
      showPrevious={step > 0}
      showNext={step < 3}
      showSubmit={step === 3}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
    />
  );
}

export default TechForm;