import PropTypes from 'prop-types';
import styles from "./Budget.module.css";

const ProjectBudget = ({ budget, setBudget }) => {


  const getBudget= (event)=> {
    setBudget(event.target.value);
  
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <p> Job post</p>
        <h2>Tell us about your budget</h2>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.segmentation}>
            <div className={styles.segmentationRadio}>
              <label>
                <input type="radio" id="fixed-price" name="projectType" />
                <span>Fixed price</span>
              </label>
              <p className={styles.description}>
              Set a price for the project and pay at the end, or you can divide the project into milestones and pay as each milestone is completed.
              </p>
              <div className={styles.priceInput}>
                <h4>What is the best cost estimate for your project?</h4>
                <p> You can negotiate this cost and create milestones when you chat with your freelancer.</p>

                <input type="text" placeholder="$ - price" id="input-fixed-price" value={budget} onChange={getBudget}/>
              </div>


              
            </div>
        </div>
      </div>
    </div>
  );
}
ProjectBudget.propTypes = {
  budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setBudget: PropTypes.func.isRequired,
};

export default ProjectBudget
