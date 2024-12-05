import React, { useState } from 'react';
import { AppBar, Toolbar, Button, TextField, Box, Typography, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

export default function Navbar({ userType }) {
  const [anchorElWork, setAnchorElWork] = useState(null);
  const [anchorElDeliver, setAnchorElDeliver] = useState(null);
  const [anchorElPostJob, setAnchorElPostJob] = useState(null);
  const [anchorElHires, setAnchorElHires] = useState(null);
  const [anchorElReport, setAnchorElReport] = useState(null);

  const openWork = Boolean(anchorElWork);
  const openDeliver = Boolean(anchorElDeliver);
  const openPostJob = Boolean(anchorElPostJob);
  const openHires = Boolean(anchorElHires);
  const openReport = Boolean(anchorElReport);

  const handleMenuClick = (setter) => (event) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = (setter) => () => {
    setter(null);
  };

  const freelancerLinks = () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {/* Find Work Dropdown */}
      <div>
        <Button color="inherit" onClick={handleMenuClick(setAnchorElWork)} endIcon={<ArrowDropDown />}>
          Find Work
        </Button>
        <Menu
          anchorEl={anchorElWork}
          open={openWork}
          onClose={handleMenuClose(setAnchorElWork)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleMenuClose(setAnchorElWork)} href="/findFreelancer">Find Work</MenuItem>
          <MenuItem onClick={handleMenuClose(setAnchorElWork)} href="/savedJobs">Saved Jobs</MenuItem>
          <MenuItem onClick={handleMenuClose(setAnchorElWork)} href="/proposals">Proposals</MenuItem>
        </Menu>
      </div>

      {/* Deliver Work Dropdown */}
      <div>
        <Button color="inherit" onClick={handleMenuClick(setAnchorElDeliver)} endIcon={<ArrowDropDown />}>
          Deliver Work
        </Button>
        <Menu
          anchorEl={anchorElDeliver}
          open={openDeliver}
          onClose={handleMenuClose(setAnchorElDeliver)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleMenuClose(setAnchorElDeliver)} href="/activeContracts">Active Contracts</MenuItem>
        </Menu>
      </div>

      <Button color="inherit" href="/refund">Refund Policy</Button>
      <Button color="inherit" href="/messages">Messages</Button>
    </Box>
  );

  const clientLinks = () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {/* Post Job Dropdown */}
      <div>
        <Button color="inherit" onClick={handleMenuClick(setAnchorElPostJob)} endIcon={<ArrowDropDown />}>
          Post Job
        </Button>
        <Menu
          anchorEl={anchorElPostJob}
          open={openPostJob}
          onClose={handleMenuClose(setAnchorElPostJob)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleMenuClose(setAnchorElPostJob)} href="/postjob">Post a Job</MenuItem>
          <MenuItem onClick={handleMenuClose(setAnchorElPostJob)} href="/dashboard">Dashboard</MenuItem>
        </Menu>
      </div>

      {/* Your Hires Button */}
      <div>
        <Button color="inherit" onClick={handleMenuClick(setAnchorElHires)} endIcon={<ArrowDropDown />}>
          Your Hires
        </Button>
        <Menu
          anchorEl={anchorElHires}
          open={openHires}
          onClose={handleMenuClose(setAnchorElHires)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleMenuClose(setAnchorElHires)} href="/yourhires">Your Hires</MenuItem>
        </Menu>
      </div>

      {/* Report Dropdown */}
      <div>
        <Button color="inherit" onClick={handleMenuClick(setAnchorElReport)} endIcon={<ArrowDropDown />}>
          Report
        </Button>
        <Menu
          anchorEl={anchorElReport}
          open={openReport}
          onClose={handleMenuClose(setAnchorElReport)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleMenuClose(setAnchorElReport)} href="/weeklySummary">Weekly Summary</MenuItem>
          <MenuItem onClick={handleMenuClose(setAnchorElReport)} href="/transactionHistory">Transaction History</MenuItem>
        </Menu>
      </div>

      <Button color="inherit" href="/messages">Messages</Button>
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <a href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            Work<span style={{ color: '#00b3ff' }}>Link</span>
          </a>
        </Typography>

        {/* Display different links based on userType */}
        {userType === 'freelancer' ? freelancerLinks() : userType === 'client' ? clientLinks() : null}

        {/* Search field */}
        <TextField
          variant="outlined"
          size="small"
          sx={{ backgroundColor: 'white', borderRadius: '4px' }}
          placeholder="Search"
        />
      </Toolbar>
    </AppBar>
  );
}
