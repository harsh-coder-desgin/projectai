import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { skillCategories, AddOtherSkills, SkillForm } from "../Componets/index.js";
import chat from "../auth/chat.js"

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

  const handleFinalSubmit = async (extraSkills) => {
    const finalData = {
      ...formData,
      other: [...formData.other, ...extraSkills],
    };
    // here call save tech api
    try {
      const techData = JSON.stringify(finalData)
      const saveskills = await chat.saveTech({ tech: techData })
      console.log(saveskills);
      if (saveskills) {
        localStorage.setItem("techSkills", techData); 
        navigate("/chat")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (showExtraForm) {
    return (
      <AddOtherSkills
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
        onNext={()=> setStep((prev) => prev + 1)}
        onPrevious={()=> setStep((prev) => prev - 1)}
        onSubmit={()=> setShowExtraForm(true)}
        currentIcon={currentForm.icon}
        step={step}
        totalSteps={skillCategories.length}
      />
    </>
  );
}

export default TechForm;