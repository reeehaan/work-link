import styles from './SectionThree.module.css'; 

const sectionThree = () => {
  return (
    
    <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.leftSection}>
        <h1>Why businesses turn to WorkLink</h1>
        <div className={styles.feature}>
          <span className={styles.icon}>✩</span>
          <div>
            <h3>Proof of quality</h3>
            <p>Check any pro’s work samples, client reviews, and identity verification.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <span className={styles.icon}>💲</span>
          <div>
            <h3>No cost until you hire</h3>
            <p>Interview potential fits for your job, negotiate rates, and only pay for work you approve.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <span className={styles.icon}>✔</span>
          <div>
            <h3>Safe and secure</h3>
            <p>
              Focus on your work knowing we help protect your data and privacy.
              We’re here with 24/7 support if you need it.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.greenBox}>
          <h2>We’re the world’s work marketplace</h2>
          <p>⭐ <strong>4.9/5</strong></p>
          <p>Clients rate professionals on WorkLink</p>
          <p>🏆 <strong>Award winner</strong></p>
          <p>G2’s 2024 Best Software Awards</p>
        </div>
        
      </div>
    </div>
  </div>
    
  )
}

export default sectionThree
