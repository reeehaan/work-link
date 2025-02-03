import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./postedProject.module.css";

const PostedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [allSkills, setAllSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  const fetchProjects = async () => {
    try {
      const apiUrl = "http://localhost:3000/api/project";
      const accessToken = localStorage.getItem("accessToken");
      const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` } };
      const response = await axios.get(apiUrl, config);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch("/skills.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch skills: ${response.statusText}`);
      }
      const data = await response.json();
      setAllSkills(data.skills || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setEditedProject({ ...project });
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleScopeChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({ ...prev, scope: { ...prev.scope, [name]: value } }));
  };

  const handleAddSkill = (skill) => {
    if (!editedProject.skills.includes(skill)) {
      setEditedProject((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Posted Projects</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project._id} className={styles.card} onClick={() => openEditModal(project)}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p><strong>Type:</strong> {project.scope.projectType}</p>
            <p><strong>Duration:</strong> {project.scope.projectDuration}</p>
            <p><strong>Description:</strong> {project.description}</p>
            <div className={styles.skills}>
            <p><strong>Skills:</strong></p> 
              <div className={styles.skillList}>
                {project.skills.map((skill, index) => (
                  <span key={index} className={styles.skillBadge}>{skill}</span>
                ))}
              </div>
            </div>
            <p className={styles.budget}>Budget: $ {project.budget}</p>
          </div>
          
        ))}
      </div>

      {/* Edit Project Modal */}
      {modalOpen && selectedProject && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Project</h3>
            <label>Title:</label>
            <input type="text" name="title" value={editedProject.title} onChange={handleInputChange} />
            
            <label>Project Type:</label>
            <input type="text" name="projectType" value={editedProject.scope.projectType} onChange={handleScopeChange} />
            
            <label>Duration:</label>
            <input type="text" name="projectDuration" value={editedProject.scope.projectDuration} onChange={handleScopeChange} />

            <label>Description:</label>
            <textarea
              name="description"
              value={editedProject.description || ""}
              onChange={handleInputChange}
              placeholder="Enter project description"
            />

            <label><strong>Skills:</strong></label>
            <input type="text" placeholder="Search skills..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            
            {/* Show skills dropdown only if searchTerm is entered */}
            {searchTerm && (
              <div className={styles.skillDropdown}>
                {allSkills.filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())).map((skill) => (
                  <div key={skill} className={styles.skillOption} onClick={() => handleAddSkill(skill)}>
                    {skill}
                  </div>
                ))}
              </div>
            )}

            <div className={styles.selectedSkills}>
              {editedProject.skills.map((skill, index) => (
                <span key={index} className={styles.skillBadge} onClick={() => handleRemoveSkill(skill)}>
                  {skill} ✖
                </span>
              ))}
            </div>

            <label>Budget ($):</label>
            <input type="number" name="budget" value={editedProject.budget} onChange={handleInputChange} />

            <div className={styles.modalActions}>
              <button className={styles.saveButton}>Save Changes</button>
              <button className={styles.cancelButton} onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedProjects;
