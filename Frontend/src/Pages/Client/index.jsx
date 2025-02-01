import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

function Index() {
  const navigate = useNavigate();

  const handlePostProject = () => {
    navigate("/post-project-layout");
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Welcome Back!</h2>
      <p className={styles.description}>
        Effortlessly manage your projects, track milestones, and collaborate with top freelancers.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>💼 Post New Project</h3>
          <p>Create a new project and start receiving proposals from talented freelancers.</p>
          <button className={styles.button} onClick={handlePostProject}>
            Get Started
          </button> 
        </div>
        <div className={styles.card}>
          <h3>📊 Track Milestones</h3>
          <p>Stay on top of your projects progress with detailed milestone tracking.</p>
          <button className={styles.button}>View Projects</button>
        </div>
      </div>
    </div>
  );
}

export default Index;