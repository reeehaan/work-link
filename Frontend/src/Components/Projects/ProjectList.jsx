
import { useNavigate } from "react-router-dom";
import styles from './ProjectList.module.css';

const ProjectList = ({ projects }) => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className={styles.projectList}>
      {projects.map((project) => (
        <div
          key={project._id.$oid}
          className={styles.projectCard}
          onClick={() => handleProjectClick(project._id.$oid)}
        >
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description.slice(0, 100)}...</p>
          <p className={styles.projectSkills}>
            {project.skills.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
