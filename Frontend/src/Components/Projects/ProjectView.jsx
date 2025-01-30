import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; 
import { jwtDecode } from 'jwt-decode';  
import styles from './ProjectView.module.css';

const ProjectView = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const [project, setProject] = useState(null);
  const [isProjectSaved, setIsProjectSaved] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [savedMessage, setSavedMessage] = useState(null); 


  const fetchIsSaved = async () => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
    const isProjectLiked = await axios.get(`http://localhost:3000/api/freelancer/save-project/${userId}/${projectId}`);
    setIsProjectSaved(isProjectLiked.data.projectIsLiked)

    }
  }
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/project/${projectId}`);

        fetchIsSaved()
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


  const handleSaveProject = async () => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      try {
        if(isProjectSaved){
          const response = await axios.delete(
            `http://localhost:3000/api/freelancer/save-project/${userId}/${projectId}`
          );
          console.log('Project unsaved successfully:', response.data);

          setSavedMessage("Project unsaved successfully!");

          setTimeout(() => setSavedMessage(null), 3000);  

        }else{
          const response = await axios.post(
            `http://localhost:3000/api/freelancer/save-project/${userId}/${projectId}`
          );
          console.log('Project saved successfully:', response.data);
  
          // Show success message
          setSavedMessage("Project saved successfully!");
          
          // Optionally, hide the message after a few seconds
          setTimeout(() => setSavedMessage(null), 3000);  
        }
       
      } catch (error) {
        console.error('Error saving project:', error);
      }
    } else {
      console.error('Token not found in localStorage');
    }
    fetchIsSaved()
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!project) {
    return <div className={styles.noProject}>No project found.</div>;
  }

  const handleApplyProject = () => {
    console.log(`Applied for Project: ${project.title}`);
  };

  return (
    <div className={styles.projectView}>
      <div className={styles.detailsContainer}>
        {/* Left Column: Project Details */}
        <div className={styles.projectDetails}>
          <div className={styles.header}>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <p className={styles.projectDescription}>{project.description}</p>
          </div>

          <div className={styles.projectScope}>
            <h3><i className="fa-solid fa-paperclip"></i> Project Scope</h3>
            <p><strong>Scope:</strong> {project.scope.projectType}</p>
            <p><strong>Duration:</strong> {project.scope.projectDuration}</p>
          </div>
          <hr className="horizontalLine"/>

          <div className={styles.projectBudget}>
            <h3><i className="fa-solid fa-tags"></i> Price</h3>
            <p><strong>${project.budget}</strong></p>
          </div>

          <hr className="horizontalLine"/>

          <div className={styles.skillsSection}>
            <h3><i className="fas fa-cogs"></i> Skills and Expertise</h3>
            <div className={styles.skillsBox}>
              {project.skills.map((skill, index) => (
                <div key={index} className={styles.skill}>{skill}</div>
              ))}
            </div>
          </div>

          <hr className="horizontalLine"/>
          <div className={styles.experienceSection}>
            <h3><i className="fas fa-user-tie"></i> Experience Level</h3>
            <p>{project.scope.experience}</p>
          </div>
        </div>

        {/* Right Column: Client Details */}
        <div className={styles.clientDetails}>
          <div className={styles.clientInfo}>
            <h3><i className="fa-solid fa-user"></i> About the client</h3>
            <p><i className="fa-regular fa-building"></i><strong>Company Name:</strong> {project.clientId.companyName || "Not Provided"}</p>
            <p><i className="fa-regular fa-envelope"></i><strong>Email:</strong> {project.clientId.email || "Not Provided"}</p>
            <p><i className="fa-solid fa-phone-flip"></i><strong>Contact Number:</strong> {project.clientId.contactNumber || "Not Provided"}</p>
          </div>

          <div className={styles.actions}>
            <button className={styles.saveButton} onClick={handleSaveProject}>
              <i className="fa-solid fa-heart"></i> {isProjectSaved ? "Unsave": "Save Project"}
            </button>
            <button className={styles.applyButton} onClick={handleApplyProject}>
              <i className="fa-solid fa-paper-plane"></i> Apply Now
            </button>
          </div>
          
          {/* Display success message */}
          {savedMessage && <div className={styles.successMessage}>{savedMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
