import styles from "./ProjectDetails.module.css";

const ProjectDetails = () => {
  return (
    <div className={styles.container}>
      <h2>Project Details</h2>

      <div className={styles.projectTitle}>
        <h4>Title</h4>
      </div>

      <div className={styles.projectDescription}>
        <h4>Description</h4>
      </div>

      <div className={styles.projectSkill}>
        <h4>Skills</h4>
      </div>

      <div className={styles.projectScope}>
        <h4>Scope</h4>
      </div>

      <div className={styles.projectBudget}>
        <h4>Budget</h4>
      </div>

      <div className={styles.buttons}>
        <button>Back</button>
        <button>Post the Project</button>
      </div>
    </div>
  )
}

export default ProjectDetails
