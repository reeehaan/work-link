import PropTypes from 'prop-types';
import styles from "./Scope.module.css";


const ProjectScope = ({
  projectType,
  setProjectType,
  projectDuration,
  setProjectDuration,
  experienceLevel,
  setExperienceLevel}) => {


  const handleProjectTypeChange = (event) => {
    setProjectType(event.target.value);
    
    
  }
  const handleProjectDurationChange = (event) => {
    setProjectDuration(event.target.value);
    
  }
  const handleExperienceLevelChange= (event) => {
    setExperienceLevel(event.target.value);
  }


  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <p>post project</p>
        <h2>Estimate the scope of your project</h2>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.segmentation}>
          <div className={styles.segmentationRadio}>
            <label>
              <input 
              type="radio" 
              id="large" 
              name="projectType"
              value="Large" 
              checked={projectType === "Large"}
              onChange={handleProjectTypeChange}/>
              <span>Large</span>
              
            </label>
            <p>Long term and complex</p>

            <label>
              <input 
              type="radio" 
              id="medium" 
              name="projectType"
              value="Medium" 
              checked={projectType === "Medium"}
              onChange={handleProjectTypeChange}/>
              <span>Medium</span> 
            </label>
            <p>Well defined project</p>

            <label>
              <input 
              type="radio" 
              id="small" 
              name="projectType" 
              value="Small"
              checked={projectType === "Small"}
              onChange={handleProjectTypeChange}/>
              <span>Small</span>  
            </label>
            <p>Quick and straightforward project</p>
          </div>
        </div>


        <div className={styles.segmentation}>
          <h4>How long will your project take?</h4>
          <div className={styles.segmentationRadio}>
              <label>
                <input 
                type="radio" 
                id="more-than-6-months" 
                name="projectDuration" 
                value="More than 6 months"
                checked={projectDuration=== "More than 6 months"}
                onChange={handleProjectDurationChange}/>
                <span>More than 6 months</span>

              </label>

              <label>
                <input 
                type="radio"
                id="three-to-six-months"
                name="projectDuration" 
                value="3 to 6 months"
                checked={projectDuration=== "3 to 6 months"}
                onChange={handleProjectDurationChange}/>
                <span>3 to 6 months</span>
                
              </label>

              <label>
                <input 
                type="radio" 
                id="one-to-three-months" 
                name="projectDuration" 
                value="1 to 3 months"
                checked={projectDuration=== "1 to 3 months"}
                onChange={handleProjectDurationChange}/>
                <span>1 to 3 months</span>
                
              </label>
            </div>
        </div>

        <div className={styles.segmentation}>
          <h4>What level of experience level you need? </h4>
            <div className={styles.segmentationRadio}>
                <label>
                  <input 
                  type="radio" 
                  id="large" 
                  name="experienceLevel"
                  value="Entry" 
                  checked={experienceLevel=== "Entry"}
                  onChange={handleExperienceLevelChange}/>
                  <span>Entry</span>
                 
                </label>
                <p>Someone new to the field</p>

                <label>
                  <input 
                  type="radio" 
                  id="medium" 
                  name="experienceLevel" 
                  value="Intermediate"
                  checked={experienceLevel=== "Intermediate"}
                  onChange={handleExperienceLevelChange}/>
                  <span>Intermediate</span>
                  
                </label>
                <p>Looking for substantial experience in the field</p>
                <label>
                  <input 
                  type="radio" 
                  id="small" 
                  name="experienceLevel"
                  value="Expert" 
                  checked={experienceLevel=== "Expert"}
                  onChange={handleExperienceLevelChange}/>
                  <span>Expert</span>
                  
                </label>
                <p>Looking for comprehensive experience in the field</p>
              </div>
          </div>
      </div>
    </div>
  )
}

ProjectScope.propTypes = {
  projectType: PropTypes.string.isRequired,
  setProjectType: PropTypes.func.isRequired,
  projectDuration: PropTypes.string.isRequired,
  setProjectDuration: PropTypes.func.isRequired,
  experienceLevel: PropTypes.string.isRequired,
  setExperienceLevel: PropTypes.func.isRequired,
};
export default ProjectScope
