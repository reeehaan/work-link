import styles from './Section.module.css'; 

const Section = () => {
  return (
    <div className={styles.section}>
      
      <div className={styles.sectionLeft}>
        <img 
          src="./src/assets/MainContent/freelancer.avif" 
          alt="Freelancer working" 
          className={styles.sectionImage}
        />
      </div>

      <div className={styles.sectionRight}>
        <h1>Find great work</h1>
        <p>
          Meet clients you are excited to work with and take your career or business to new heights.
        </p>
        <ul>
          <li>Find opportunities for every stage of your freelance career</li>
          <li>Control when, where, and how you work</li>
          <li>Explore different ways to earn</li>
        </ul>
        <button className={styles.btn}>Find opportunities</button>
      </div>
    </div>
  );
}

export default Section;
