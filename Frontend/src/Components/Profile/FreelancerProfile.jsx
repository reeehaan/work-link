
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import styles from "./FreelancerProfile.module.css";
import ProfileImage from "./ProfileImage"

const predefinedJobTitles = [
  "Web Developer",
  "Graphic Designer",
  "UI/UX Designer",
  "Digital Marketer",
  "Software Engineer",
  "Project Manager"
];

const FreelancerProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    email: "",
    image: "",
    title: "",
    bio: "",
    skills: [],
    portfolio: []
  });

  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleImageUpdate = (newImageUrl) => {
    // Update both states to ensure immediate UI update
    setUserProfile(prevProfile => ({
      ...prevProfile,
      image: newImageUrl
    }));
    
    setUpdatedProfile(prevState => ({
      ...prevState,
      image: newImageUrl
    }));
  };

  const fetchUserProfileName = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;
        const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
        const userDetails = response.data;
        const freelancerProfile = userDetails.freelancerProfile;

        setUserProfile({ ...userDetails, freelancerProfile });
        setUpdatedProfile({
          
          image: freelancerProfile.image,
          title: freelancerProfile.title,
          bio: freelancerProfile.bio,
          skills: freelancerProfile.skills,
          portfolio: freelancerProfile.portfolio,
          email:freelancerProfile.email
        });
      } else {
        console.error('Token not found in localStorage');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfileName();

    // Fetch skills from a JSON file
    const fetchSkills = async () => {
      try {
        const response = await fetch("/skills.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch skills: ${response.statusText}`);
        }
        const data = await response.json();
        const skills = data.skills || [];
        setAllSkills(skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({
      ...updatedProfile,
      [name]: value
    });
  };

  

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value) {
      setFilteredSkills(
        allSkills.filter((skill) =>
          skill.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredSkills([]);
    }
  };

  const handleAddSkill = (skill) => {
    if (skill && !updatedProfile.skills.includes(skill)) {
      setUpdatedProfile({
        ...updatedProfile,
        skills: [...updatedProfile.skills, skill]
      });
      setSearchInput("");  // Reset search input after adding skill
      setFilteredSkills([]);  // Reset the filtered skills list
    }
  };

  const handleRemoveSkill = (skill) => {
    setUpdatedProfile({
      ...updatedProfile,
      skills: updatedProfile.skills.filter((item) => item !== skill)
    });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;

        const response = await axios.put(`http://localhost:3000/api/freelancer/profile/${userId}`, {
          ...updatedProfile
        });

        if (response.data) {
          const updatedUserProfile = response.data;
          setUserProfile({
            ...userProfile,
            freelancerProfile: {
              ...updatedUserProfile.freelancerProfile,
              ...updatedProfile
            }
          });

          setEditMode(false);
        } else {
          console.error('Failed to update profile: No data received');
        }
      } else {
        console.error('Token not found in localStorage');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const { freelancerProfile, firstName, lastName,image } = userProfile;
  const { title, bio, skills, portfolio, email } = freelancerProfile;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileInfo}>
        <div className={styles.profileLeft}>
          <ProfileImage
            editMode={editMode}
            image={updatedProfile.image ?? image}
            firstName={firstName}
            lastName={lastName}
            onImageUpdate={handleImageUpdate}
          />
          <div className={styles.profileName}>
            <h2>{firstName} {lastName}</h2>
            <p>{title}</p>
          </div>
        </div>

        <div className={styles.profileRight}>
          {editMode ? (
            <div>
              <h3>Email</h3>
              <input
                type="email"
                name="email"
                value={updatedProfile.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <h3>Title</h3>
              <select
                name="title"
                value={updatedProfile.title}
                onChange={handleInputChange}
              >
                <option value="">Select Job Title</option>
                {predefinedJobTitles.map((title, index) => (
                  <option key={index} value={title}>{title}</option>
                ))}
              </select>

              <h3>Bio</h3>
              <textarea
                name="bio"
                value={updatedProfile.bio}
                onChange={handleInputChange}
                placeholder="Write your bio"
              />

              <h3>Skills</h3>
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Search for a skill"
                className={styles.searchInput}
              />
              
              
              <div className={styles.filteredSkillsList}>
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill, index) => (
                    <div key={index} className={styles.skillTab}>
                      <span>{skill}</span>
                      <button onClick={() => handleAddSkill(skill)}>+</button>
                    </div>
                  ))
                ) : (
                  <p className={styles.noSkillsFound}>No skills found</p>
                )}
              </div>

              <div className={styles.skillsContainer}>
                {updatedProfile.skills.map((skill, index) => (
                  <div key={index} className={styles.skillTab}>
                    <span>{skill}</span>
                    <button onClick={() => handleRemoveSkill(skill)}>Remove</button>
                  </div>
                ))}
              </div>

              <div className={styles.portfolioForm}>
                <h3>Portfolio Projects</h3>
                {updatedProfile.portfolio.map((project, index) => (
                  <div key={index} className={styles.portfolioFormItem}>
                    <input
                      type="text"
                      value={project.projectTitle || ''}
                      onChange={(e) => {
                        const newPortfolio = [...updatedProfile.portfolio];
                        newPortfolio[index] = {
                          ...newPortfolio[index],
                          projectTitle: e.target.value
                        };
                        setUpdatedProfile({
                          ...updatedProfile,
                          portfolio: newPortfolio
                        });
                      }}
                      placeholder="Project Title"
                    />
                    <input
                      type="text"
                      value={project.projectImage || ''}
                      onChange={(e) => {
                        const newPortfolio = [...updatedProfile.portfolio];
                        newPortfolio[index] = {
                          ...newPortfolio[index],
                          projectImage: e.target.value
                        };
                        setUpdatedProfile({
                          ...updatedProfile,
                          portfolio: newPortfolio
                        });
                      }}
                      placeholder="Image URL"
                    />
                    <button 
                      onClick={() => {
                        const newPortfolio = updatedProfile.portfolio.filter((_, i) => i !== index);
                        setUpdatedProfile({
                          ...updatedProfile,
                          portfolio: newPortfolio
                        });
                      }}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    setUpdatedProfile({
                      ...updatedProfile,
                      portfolio: [
                        ...updatedProfile.portfolio, 
                        { projectTitle: '', projectImage: '' }
                      ]
                    });
                  }}
                  className={styles.addButton}
                >
                  Add Project
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.bioSection}>
                <h3>Bio</h3>
                <p>{bio}</p>
              </div>
              <h3>Skills</h3>
              <div className={styles.skillsContainer}>
                {skills.map((skill, index) => (
                  <span key={index} className={styles.skillTab}>{skill}</span>
                ))}
              </div>
              <h3>Portfolio</h3>
              {portfolio.length > 0 ? (
                  <div className={styles.portfolioGrid}>
                  {portfolio.map((project, index) => (
                    <div key={index} className={styles.portfolioItem}>
                      <div className={styles.portfolioImageWrapper}>
                        <img 
                          src={project.projectImage} 
                          alt={project.projectTitle}
                          className={styles.portfolioImage}
                        />
                      </div>
                      <h4 className={styles.portfolioTitle}>{project.projectTitle}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No portfolio available.</p>
              )}
              <h3>Contact</h3>
              <p>{email}</p>
            </div>
          )}
        </div>
      </div>
        <button className={styles.actionButton} onClick={editMode ? handleSaveChanges : () => setEditMode(true)}>
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
  );
};

export default FreelancerProfile;
