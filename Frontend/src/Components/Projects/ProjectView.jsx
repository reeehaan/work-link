import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './ProjectView.module.css';

const ProjectView = ({ projects }) => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const selectedProject = projects.find(
      (proj) => proj._id.$oid === projectId
    );
    setProject(selectedProject);
  }, [projectId, projects]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const handleSaveJob = () => {
    // Logic to save the job (e.g., storing in a saved list)
    console.log(`Job saved: ${project.title}`);
  };

  const handleApplyJob = () => {
    // Logic to apply to the job
    console.log(`Applied for job: ${project.title}`);
  };

  return (
    <div className={styles.projectView}>
      <h1 className={styles.projectTitle}>{project.title}</h1>
      <p className={styles.projectDescription}>{project.description}</p>
      <div className={styles.projectType}>
        <h3>Project Scope</h3>
        <p><strong>Scope:</strong> {project.scope.projectType}</p>
        <p><strong>Duration:</strong> {project.scope.projectDuration}</p>
        <p><strong>Experience Level:</strong> {project.scope.experience}</p>
      </div>
      <div className={styles.projectDetailsSection}>
        <h3>Skills</h3>
        <p>{project.skills.join(", ")}</p>
      </div>
      <div className={styles.projectDetailsSection}>
        <h3>Budget</h3>
        <p>${project.budget.$numberInt}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.saveButton} onClick={handleSaveJob}>
          Save Job
        </button>
        <button className={styles.applyButton} onClick={handleApplyJob}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default ProjectView;
