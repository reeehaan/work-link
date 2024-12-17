import { useState } from 'react';
import styles from './FreelancerProfile.module.css';

const FreelancerProfile = () => {
  const [profileData] = useState({
    name: 'Rehan',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with over 5 years of experience building scalable web applications.',
    skills: ['React.js', 'Node.js', 'MongoDB', 'GraphQL', 'CSS'],
    portfolio: [
      {
        title: 'E-commerce Platform',
        image: 'https://via.placeholder.com/150?text=E-commerce',
      },
      {
        title: 'Portfolio Website',
        image: 'https://via.placeholder.com/150?text=Portfolio',
      },
      {
        title: 'Expense Management System',
        image: 'https://via.placeholder.com/150?text=Expense+Management',
      },
    ],
    feedback: [],
    hourlyRate: '$50/hr',
    completedProjects: 120,
  });

  return (
    <div className={styles.mainContent}>
      <div className={styles.profileHeaderContainer}>
        <div className={styles.profileActionButtons}>
          <button className={styles.actionBtn}>Profile Settings</button>
          {/* <button className={styles.actionBtn}>See public view</button> */}
        </div>
      </div>

      
      <div className={styles.profileHeader}>
        <div className={styles.profilePicContainer}>
          <img
            src="https://via.placeholder.com/150"
            alt="Freelancer's profile"
            className={styles.profilePic}
          />
        </div>
        <div className={styles.profileBasicInfo}>
          <h1>{profileData.name}</h1>
          <p>{profileData.title}</p>
          <div>
            <span>4.8 ★</span> <span>(85 reviews)</span>
          </div>
        </div>
      </div>

      
      <div className={styles.profileBio}>
        <h3>About</h3>
        <textarea>{profileData.bio}</textarea>
      </div>

      
      <div className={styles.profileSkills}>
        <h3>Skills</h3>
        <ul>
          {profileData.skills.map((skill, index) => (
            <li key={index} className={styles.skillTag}>
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Portfolio Section */}
      <div className={styles.portfolioSection}>
        <h3>Portfolio</h3>
        <div className={styles.portfolioGrid}>
          {profileData.portfolio.map((project, index) => (
            <div key={index} className={styles.portfolioItem}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.portfolioImage}
              />
              <h4>{project.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
