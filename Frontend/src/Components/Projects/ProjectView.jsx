import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; 
import styles from './ProjectView.module.css';


const ProjectView = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/project/${projectId}`);
        console.log(response)
        setProject(response.data); // Assuming the response has the project data
      } catch (err) {
        setError("Unable to fetch the project data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]); // Rerun when projectId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!project) {
    return <div>No project found.</div>;
  }

  const handleSaveProject = () => {
    // Logic to save the Project (e.g., storing in a saved list)
    console.log(`Project saved: ${project.title}`);
  };

  const handleApplyProject = () => {
    // Logic to apply to the Project
    console.log(`Applied for Project: ${project.title}`);
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
        <p>${project.budget}</p>
      </div>

      {/* <div className={styles.clientDetailsSection}>
        <h3>Client Details</h3>
        <p><strong>Client Name:</strong> {project.client.name}</p>
        <p><strong>Payment Verified:</strong> {project.client.paymentVerified ? "Yes" : "No"}</p>
        <p><strong>Contact Email Verified:</strong> {project.client.emailVerified ? "Yes" : "No"}</p>
        <p><strong>Number of Project Posted:</strong> {project.client.projectPosted}</p>
      </div> */}

      <div className={styles.actions}>
        <button className={styles.saveButton} onClick={handleSaveProject}>
          Save Project
        </button>
        <button className={styles.applyButton} onClick={handleApplyProject}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default ProjectView;
