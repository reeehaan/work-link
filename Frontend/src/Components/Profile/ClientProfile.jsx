import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ProfileImage from './ProfileImage';
import styles from './ClientProfile.module.css';

const ClientProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    email: '',
    image: '',
    companyName: '',
    contactNumber: '',
  });

  // Handle profile image update
  const handleImageUpdate = (newImageUrl) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      clientProfile: {
        ...prevProfile?.clientProfile,
        image: newImageUrl,
      },
    }));

    setUpdatedProfile((prevState) => ({
      ...prevState,
      image: newImageUrl,
    }));
  };

  // Fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await axios.get(
        `http://localhost:3000/api/user/${userId}`
      );

      const userDetails = response.data;
      const clientProfile = userDetails.ClientProfile || {};

      setUserProfile({ ...userDetails, clientProfile });
      setUpdatedProfile({
        image: clientProfile.image,
        companyName: clientProfile.companyName,
        contactNumber: clientProfile.contactNumber,
        email: clientProfile.email,
      });
      console.log(userProfile);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  // Handle input change in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle saving profile updates
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await axios.put(
        `http://localhost:3000/api/client/profile/${userId}`,
        updatedProfile
      );

      if (response.data) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          clientProfile: {
            ...prevProfile?.clientProfile,
            ...updatedProfile,
          },
        }));
        setEditMode(false);
      } else {
        console.error('Failed to update profile: No data received');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handle loading state
  if (userProfile === null) {
    return <div>Loading...</div>;
  }

  // Ensure clientProfile is always available
  const { clientProfile = {}, firstName, lastName, image } = userProfile;
  const { companyName, contactNumber, email } = clientProfile;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileInfo}>
        <div className={styles.profileLeft}>
          <ProfileImage
            editMode={editMode}
            image={updatedProfile.image || image}
            firstName={firstName}
            lastName={lastName}
            onImageUpdate={handleImageUpdate}
          />
          <div className={styles.profileName}>
            <h2>
              {firstName} {lastName}
            </h2>
          </div>
        </div>
      </div>

      <div className={styles.profileRight}>
        {editMode ? (
          <div>
            <h3>Email</h3>
            <input
              type='email'
              name='email'
              value={updatedProfile.email}
              onChange={handleInputChange}
              placeholder='Email'
            />
            <h3>Company Name</h3>
            <input
              name='companyName'
              value={updatedProfile.companyName}
              onChange={handleInputChange}
              placeholder='Company Name'
            />
            <h3>Contact Number</h3>
            <input
              name='contactNumber'
              value={updatedProfile.contactNumber}
              onChange={handleInputChange}
              placeholder='Contact Number'
            />
          </div>
        ) : (
          <div>
            <h3>Company Name</h3>
            <p>{companyName || 'Not Provided'}</p>
            <h3>Contact Number</h3>
            <p>{contactNumber || 'Not Provided'}</p>
            <h3>Email</h3>
            <p>{email || 'Not Provided'}</p>
          </div>
        )}
      </div>

      <button
        className={styles.actionButton}
        onClick={editMode ? handleSaveChanges : () => setEditMode(true)}
      >
        {editMode ? 'Save Changes' : 'Edit Profile'}
      </button>
    </div>
  );
};

export default ClientProfile;
