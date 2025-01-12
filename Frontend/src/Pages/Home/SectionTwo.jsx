import styles from './SectionTwo.module.css'; 

const SectionTwo = () => {
  return (
    <div className={styles.sectionTwo}>
        <div className={styles.sectionTwoLeft}>
            <h1>Collaborate Seamlessly</h1>
            <p>
            From project initiation to completion, our platform offers a streamlined collaboration experience for freelancers and clients alike.
            </p>
            <ul>
            <li><i className="fas fa-calendar-alt"></i> Manage tasks and milestones with an intuitive dashboard</li>
            <li><i className="fas fa-comments"></i> Communicate effortlessly through built-in chat</li>
            <li><i className="fas fa-folder"></i> Share and organize files securely in one place</li>
            <li><i className="fas fa-chart-line"></i> Track progress with real-time updates</li>
            </ul>
            <button className={styles.btn}>Explore Collaboration</button>
        </div>

        <div className={styles.sectionTwoRight}>
            <img 
            src="./src/assets/MainContent/collabaration.gif" 
            alt="Freelancer collaboration" 
            className={styles.sectionImage}
            />
        </div>
    </div>

   
  )
}

export default SectionTwo
