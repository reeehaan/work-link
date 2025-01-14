import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./Skill.module.css";


const ProjectSkill = ({ selectedSkills, setSelectedSkills }) => {
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Fetch the skills from an API or JSON file
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/skills.json"); // Correct path
        if (!response.ok) {
          throw new Error(`Failed to fetch skills: ${response.statusText}`);
        }
        const data = await response.json();
  
        // Access the `skills` array from the JSON data
        const skills = data.skills || [];
        setAllSkills(skills);
        setFilteredSkills(skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
  
    fetchSkills();
  }, []);

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((item) => item !== skill));
  };

  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value) {
      setFilteredSkills(
        allSkills.filter((skill) =>
          skill.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredSkills(allSkills);
    }
  };

  const handleAddCustomSkill = () => {
    if (searchInput && !selectedSkills.includes(searchInput)) {
      setSelectedSkills([...selectedSkills, searchInput]);
      setSearchInput("");
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
          <input
            type="text"
            placeholder="Type a skill"
            value={searchInput}
            onChange={handleSearchInputChange}
            className={styles.searchInput}
          />
          <button onClick={handleAddCustomSkill} className={styles.addSkillBtn}>
            Add Skill
          </button>
          <p className={styles.infoText}>
            For the best results, add 3-5 skills
          </p>
        </div>

        <div>
          <p className={styles.sectionTitle}>Selected skills</p>
          <div className={styles.selectedSkills}>
            {selectedSkills.map((skill) => (
              <div key={skill} className={styles.skillTag}>
                {skill}{" "}
                <span onClick={() => handleRemoveSkill(skill)}>x</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className={styles.sectionTitle}>Popular skills</p>
          <div className={styles.popularSkills}>
            {filteredSkills
              .slice(0, searchInput ? filteredSkills.length : 6)
              .map((skill) => (
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
