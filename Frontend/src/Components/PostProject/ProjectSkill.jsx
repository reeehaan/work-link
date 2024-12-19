import PropTypes from "prop-types";
import styles from "./Skill.module.css";

const ProjectSkill = ({selectedSkills, setSelectedSkills}) => {
  
  const popularSkills = [
    "WordPress",
    "Web Development",
    "JavaScript",
    "HTML5",
    "Ecommerce Website",
    "MySQL",
    "jQuery",
    "Website Customization",
    "Website",
    "Stripe",
    "API",
    "Ecommerce Website Development",
    "Bootstrap",
    "Custom PHP",
    "Gravity Forms",
    "Adobe XD",
  ];

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((item) => item !== skill));
  };

  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <p>post project</p>
        <h2>What are the main skills required for your work?</h2>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.inputSection}>
          <label>Search skills or add your own</label>
          <input type="text" placeholder="skill" className={styles.searchInput} />
          <p className={styles.infoText}>
            For the best results, add 3-5 skills
          </p>
        </div>

        <div>
          <p className={styles.sectionTitle}>Selected skills</p>
          <div className={styles.selectedSkills}>
            {selectedSkills.map((skill) => (
              <div key={skill} className={styles.skillTag}>
                {skill} <span onClick={() => handleRemoveSkill(skill)}>x</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className={styles.sectionTitle}>Popular skills </p>
          <div className={styles.popularSkills}>
            {popularSkills.map((skill) => (
              <div
                key={skill}
                className={styles.skillButton}
                onClick={() => handleAddSkill(skill)}
              >
                {skill} +
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectSkill.propTypes = {
  selectedSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedSkills: PropTypes.func.isRequired,
};
export default ProjectSkill;
