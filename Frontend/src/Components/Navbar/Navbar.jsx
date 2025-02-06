import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  Box,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function Navbar({ userType }) {
  const navigate = useNavigate();

  const [anchorElWork, setAnchorElWork] = useState(null);
  const [anchorElDeliver, setAnchorElDeliver] = useState(null);
  const [anchorElPostJob, setAnchorElPostJob] = useState(null);
  const [anchorElHires, setAnchorElHires] = useState(null);
  const [anchorElReport, setAnchorElReport] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null); // For profile dropdown

  const openWork = Boolean(anchorElWork);
  const openDeliver = Boolean(anchorElDeliver);
  const openPostJob = Boolean(anchorElPostJob);
  const openHires = Boolean(anchorElHires);
  const openReport = Boolean(anchorElReport);
  const openProfile = Boolean(anchorElProfile);

  const handleMenuClick = (setter) => (event) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = (setter) => () => {
    setter(null);
  };

  const freelancerLinks = () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <div>
        <Button
          color='inherit'
          onClick={handleMenuClick(setAnchorElWork)}
          endIcon={<ArrowDropDown />}
          sx={{ color: '#007bff' }}
        >
          Find Work
        </Button>
        <Menu
          anchorEl={anchorElWork}
          open={openWork}
          onClose={handleMenuClose(setAnchorElWork)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem onClick={() => handleFindWorkClick()} href='/project/all'>
            Find Work
          </MenuItem>
          <MenuItem onClick={() => handleSaveProjectClick()} href='/savedJobs'>
            Saved Projects
          </MenuItem>
          <MenuItem
            onClick={() => handleProposalsClick()}
            href='/proposals'
          >
            Proposals
          </MenuItem>
        </Menu>
      </div>

      <div>
        <Button
          color='inherit'
          onClick={handleMenuClick(setAnchorElDeliver)}
          endIcon={<ArrowDropDown />}
          sx={{ color: '#007bff' }}
        >
          Deliver Work
        </Button>
        <Menu
          anchorEl={anchorElDeliver}
          open={openDeliver}
          onClose={handleMenuClose(setAnchorElDeliver)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem
            onClick={handleMenuClose(setAnchorElDeliver)}
            href='/activeContracts'
          >
            Active Contracts
          </MenuItem>
          <MenuItem
            onClick={() => handleMilestoneClick()}
            href='/activeContracts'
          >
            Milestone Manager
          </MenuItem>
        </Menu>
      </div>

      <Button color='inherit' href='/refund' sx={{ color: '#007bff' }}>
        Refund Policy
      </Button>
      <Button
        color='inherit'
        onClick={() => handleMessageClick()}
        sx={{ color: '#007bff' }}
      >
        Messages
      </Button>
    </Box>
  );

  const clientLinks = () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <div>
        <Button
          color='inherit'
          onClick={handleMenuClick(setAnchorElPostJob)}
          endIcon={<ArrowDropDown />}
          sx={{ color: '#007bff' }}
        >
          Post Job
        </Button>
        <Menu
          anchorEl={anchorElPostJob}
          open={openPostJob}
          onClose={handleMenuClose(setAnchorElPostJob)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem onClick={handlePostProject} href='/post-project-layout'>
            Post a Project
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose(setAnchorElPostJob)}
            href='/dashboard'
          >
            Dashboard
          </MenuItem>
        </Menu>
      </div>

      <div>
        <Button
          color='inherit'
          onClick={handleMenuClick(setAnchorElHires)}
          endIcon={<ArrowDropDown />}
          sx={{ color: '#007bff' }}
        >
          Your Hires
        </Button>
        <Menu
          anchorEl={anchorElHires}
          open={openHires}
          onClose={handleMenuClose(setAnchorElHires)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem
            onClick={handleMenuClose(setAnchorElHires)}
            href='/yourhires'
          >
            Your Hires
          </MenuItem>
        </Menu>
      </div>

      <div>
        <Button
          color='inherit'
          onClick={handleMenuClick(setAnchorElReport)}
          endIcon={<ArrowDropDown />}
          sx={{ color: '#007bff' }}
        >
          Report
        </Button>
        <Menu
          anchorEl={anchorElReport}
          open={openReport}
          onClose={handleMenuClose(setAnchorElReport)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem
            onClick={handleMenuClose(setAnchorElReport)}
            href='/weeklySummary'
          >
            Weekly Summary
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose(setAnchorElReport)}
            href='/transactionHistory'
          >
            Transaction History
          </MenuItem>
        </Menu>
      </div>

      <Button
        color='inherit'
        onClick={() => handleMessageClick()}
        sx={{ color: '#007bff' }}
      >
        Messages
      </Button>
    </Box>
  );
  //logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const handlePostProject = () => {
    navigate('/post-project-layout');
    setAnchorElPostJob(null);
  };

  const handleMessageClick = () => {
    navigate('/live-chat');
    setAnchorElPostJob(null);
  };

  const handleSaveProjectClick = () => {
    navigate('/freelancer/save-project');
    setAnchorElPostJob(null);
  };

  const handleProfileClick = () => {
    userType === 'freelancer'
      ? navigate('/freelancer/profile')
      : navigate('/client/profile');
    setAnchorElPostJob(null);
  };

  const handleFindWorkClick = () => {
    navigate('/freelancer');
    setAnchorElPostJob(null);
  };

  const handleProposalsClick = () => {
    navigate('/freelancer/all-proposal');
    setAnchorElPostJob(null);
  };
  const handleMilestoneClick = () => {
    navigate('/milestone-manager');
    setAnchorElPostJob(null);
  };


  
  

  //To display user's name in the navbar
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
  });

  const fetchUserProfileName = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Assuming JWT is stored in localStorage as 'accessToken'
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id; // Adjust this depending on the structure of your JWT payload
        const response = await axios.get(
          `http://localhost:3000/api/user/${userId}`
        );
        console.log(response);
        const { firstName, lastName, image } = response.data;
        setUserProfile({ firstName, lastName, image }); // Update the userProfile state with the fetched data
        // Call the function to handle profile cli
      } else {
        console.error('Token not found in localStorage');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfileName();
  }, []);

  return (
    <AppBar
      position='sticky'
      sx={{ backgroundColor: '#ffffff', color: '#000000' }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          <a
            href='/'
            style={{
              textDecoration: 'none',
              color: '#000000',
              fontWeight: 'bold',
            }}
          >
            Work<span style={{ color: 'rgb(0, 123, 255)' }}>Link</span>
          </a>
        </Typography>

        {userType === 'freelancer'
          ? freelancerLinks()
          : userType === 'client'
          ? clientLinks()
          : null}

        <TextField
          variant='outlined'
          size='small'
          sx={{ backgroundColor: 'white', borderRadius: '4px', marginRight: 2 }}
          placeholder='Search'
        />

        <Typography variant='body1' sx={{ marginRight: 2, fontWeight: 400 }}>
          {userProfile.firstName} {userProfile.lastName}
        </Typography>

        <div>
          <IconButton onClick={handleMenuClick(setAnchorElProfile)}>
            <Avatar alt='' src={userProfile.image} />
          </IconButton>
          <Menu
            anchorEl={anchorElProfile}
            open={openProfile}
            onClose={handleMenuClose(setAnchorElProfile)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => handleProfileClick()} href='/'>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  userType: PropTypes.oneOf(['freelancer', 'client']).isRequired,
};
