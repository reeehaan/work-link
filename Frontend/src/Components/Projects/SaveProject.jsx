import { useNavigate } from "react-router-dom";
import styles from "./SaveProject.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import moment from "moment"; // Importing moment for time formatting

const SaveProject = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const getSaveProject = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError("No token found.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const apiUrl = `http://localhost:3000/api/freelancer/save-project/${userId}`;

      const response = await axios.get(apiUrl);

      console.log("Fetched Projects:", response.data); // Log the response data

      // Assuming the projects are inside the 'projectId' array in the response
      const projectData = response.data[0]?.projectId || [];

      if (projectData.length > 0) {
        setProjects(projectData);
      } else {
        setError("No projects found.");
      }
    } catch (error) {
      setError("Unable to fetch projects. Please try again later.");
      console.error("Error fetching recent projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSaveProject();
  }, []);

  // Function to format the posted time
  const formatTimeAgo = (createdAt) => {
    const timeAgo = moment(createdAt);
    const diffInMinutes = moment().diff(timeAgo, 'minutes');
    const diffInHours = moment().diff(timeAgo, 'hours');
    const diffInDays = moment().diff(timeAgo, 'days');

    // If the time difference is less than 60 minutes, show minutes
    if (diffInMinutes < 60) {
      return `Posted ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    // If the time difference is less than 24 hours, show hours
    else if (diffInHours < 24) {
      return `Posted ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    // If the time difference is 24 hours or more, show days
    else {
      return `Posted ${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className={styles.projectList}>
      <h1 className={styles.title}>Saved Projects</h1>
      {loading ? (
        <div className={styles.loader}>Loading...</div>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : projects.length > 0 ? (
        <div className={styles.projectsContainer}>
          {projects.map((project) => (
            <div
              key={project._id}
              className={styles.projectCard}
              onClick={() => handleProjectClick(project._id)}
            >
              {/* Time ago display */}
              <div className={styles.postedTime}>
                {formatTimeAgo(project.createdAt)}
              </div>

              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>
                {project.description.length > 100
                  ? `${project.description.substring(0, 250)}...`
                  : project.description}
              </p>
              <div className={styles.skillsContainer}>
                {Array.isArray(project.skills) && project.skills.length > 0 ? (
                  project.skills.map((skill, index) => (
                    <span key={index} className={styles.skillTab}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className={styles.noSkills}>No skills listed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noProjects}>No saved projects available.</p>
      )}
    </div>
  );
};

export default SaveProject;
