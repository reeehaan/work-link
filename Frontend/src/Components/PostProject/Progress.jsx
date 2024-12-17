

import { useState } from 'react';
import styles from './Progress.module.css'; 

const Progress = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className={styles.buttons}>
        <button
          className={styles.prevButton}
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Back
        </button>
        
        <button
          className={styles.nextButton}
          onClick={nextStep}
        >
          {currentStep === totalSteps ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Progress;

