import styles from "./Description.module.css";
import PropTypes from 'prop-types';

const ProjectDescription = ({ description, setDescription }) => {
  
  const maxLength = 500; 


  const handleChange = (event) => {
    setDescription(event.target.value);
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <p>post project</p>
        <h2>Start the Description</h2>
        <p>Skills you are looking for:</p>
        <ul>
          <li>Clear expectations about your task or deliverables</li>
          <li>The skills required for your work</li>
          <li>Good communication</li>
        </ul>
      </div>

      <div className={styles.rightSection}>
        <h4>Describe what you need</h4>
        <textarea
          placeholder="Already have a description? Paste it here"
          value={description}
          onChange={handleChange}
          maxLength={maxLength}
        />
        <div className={styles.charCounter}>
          <span>{maxLength - description.length} characters remaining</span>
        </div>
      </div>
    </div>
  );
};

ProjectDescription.propTypes = {
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired
};
export default ProjectDescription;
