import PropTypes from "prop-types";
import styles from "./Progress.module.css";

const Progress = ({ currentStep, totalSteps, nextStep, prevStep }) => {
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

        <button className={styles.nextButton} onClick={nextStep}>
          {currentStep === totalSteps ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
Progress.propTypes = {
  currentStep: PropTypes.number.isRequired, 
  totalSteps: PropTypes.number.isRequired,  
  nextStep: PropTypes.func.isRequired,      
  prevStep: PropTypes.func.isRequired,      
};

export default Progress;
