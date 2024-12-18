import { useState } from "react"; 
import Progress from "./Progress";
import ProjectTitle from "./ProjectTitle";
import ProjectSkill from "./ProjectSkill";
import ProjectScope from "./ProjectScope";
import ProjectBudget from "./ProjectBudget";
import ProjectDescription from "./ProjectDescription";


const PostProjectLayout = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const totalSteps = 5;

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
            case 1 :
                return <ProjectTitle/>;
            
            case 2 :
                return <ProjectSkill/>;
                
            case 3 :
                return <ProjectScope/>;

            case 4 :
                return <ProjectBudget/>;

            case 5 :
                return <ProjectDescription/>;
            
            default:
                return <ProjectTitle/>;
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
