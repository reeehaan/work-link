import { useNavigate } from "react-router-dom";
import styles from "./ProjectList.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const getRecentProjects = async () => {
    try {
      const apiUrl = "http://localhost:3000/api/project/recent";
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(apiUrl, config);
      setProjects(response.data);
    } catch (error) {
      setError("Unable to fetch projects. Please try again later.");
      console.error("Error fetching recent projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecentProjects();
  }, []);

  return (
    <div className={styles.projectList}>
      <h1 className={styles.title}>Projects You Might Like</h1>
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
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>
                {project.description.length > 100
                  ? `${project.description.substring(0, 250)}...`
                  : project.description}
              </p>
              <div className={styles.skillsContainer}>
                {project.skills.map((skill, index) => (
                  <span key={index} className={styles.skillTab}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noProjects}>No recent projects available.</p>
      )}
    </div>
  );
};

export default ProjectList;
