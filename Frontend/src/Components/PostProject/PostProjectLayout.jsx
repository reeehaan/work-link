import { useState } from "react"; 
import Progress from "./Progress";
import ProjectTitle from "./ProjectTitle";
import ProjectSkill from "./ProjectSkill";
import ProjectScope from "./ProjectScope";
import ProjectBudget from "./ProjectBudget";
import ProjectDescription from "./ProjectDescription";
import ProjectDetails from "./ProjectDetails"


const PostProjectLayout = () => {
    
    const [currentStep, setCurrentStep] = useState(1);

    const [projectTitle, setProjectTitle] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [projectType, setProjectType] = useState("");
    const [projectDuration, setProjectDuration] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");
    const [budget, setBudget] = useState("");
    const [description, setDescription] = useState("");
  
    // all states

    const totalSteps = 6;

    const nextStep = () => {
        if(currentStep < totalSteps){
            setCurrentStep(currentStep + 1);
        }
    }

    const prevStep = () => {
        if(currentStep > 1){
            setCurrentStep(currentStep - 1);
        }
    }

    const renderStepComponent = ()  =>{
        switch(currentStep){
            case 1:
                return <ProjectTitle 
                    projectTitle={projectTitle} 
                    setProjectTitle={setProjectTitle} 
                />;
            
            case 2:
                return <ProjectSkill 
                    selectedSkills={selectedSkills} 
                    setSelectedSkills={setSelectedSkills} 
                />;
                
            case 3:
                return <ProjectScope 
                    projectType={projectType}
                    setProjectType={setProjectType}
                    projectDuration={projectDuration}
                    setProjectDuration={setProjectDuration}
                    experienceLevel={experienceLevel}
                    setExperienceLevel={setExperienceLevel}
                />;

            case 4:
                return <ProjectBudget 
                    budget={budget}
                    setBudget={setBudget}
                />;

            case 5:
                return <ProjectDescription 
                    description={description}
                    setDescription={setDescription}
                />;
            case 6:
                return <ProjectDetails 
                    projectTitle={projectTitle}
                    selectedSkills={selectedSkills}
                    projectType={projectType}
                    projectDuration={projectDuration}
                    experienceLevel={experienceLevel}
                    budget={budget}
                    description={description}
                />;
        }
    };

  return (
   <>
   {renderStepComponent()} 
      <Progress
        currentStep={currentStep}
        totalSteps={totalSteps}
        nextStep={nextStep}
        prevStep={prevStep}
      />
   </>
  )
}

export default PostProjectLayout
