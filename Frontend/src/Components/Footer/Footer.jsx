import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        p: 2,
        backgroundColor: '#f8f8f8',
        color: '#333',
      }}
    >
      <Box sx={{ maxWidth: 250 }}>
        <Typography variant="h6" sx={{ mb: 1,color: '#007bff' }}>
          WorkLink
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.5, mb: 2 }}>
          Powerful Freelance Marketplace System with the ability to change lives
          (Freelancers & Clients).
        </Typography>
        <Box>
          <Link href="/" sx={{ mr: 2, color: '#007bff', fontWeight: 'bold', textDecoration: 'none', '&:hover': { color: '#0056b3' } }}>
            Instagram
          </Link>
          <Link href="/" sx={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none', '&:hover': { color: '#0056b3' } }}>
            Facebook
          </Link>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 1, color: '#007bff' ,fontWeight: 'bold'}}>
            For Clients
          </Typography>
          <Link href="/" sx={{ display: 'block', mb: 1, color: '#333',textDecoration: 'none', '&:hover': { color: '#007bff' } }}>
            Find Freelancer
          </Link>
          <Link href="/" sx={{ display: 'block', mb: 1, color: '#333', textDecoration: 'none', '&:hover': { color: '#007bff' } }}>
            Post a project
          </Link>
          <Link href="/" sx={{ display: 'block', mb: 1, color: '#333', textDecoration: 'none', '&:hover': { color: '#007bff' } }}>
            Refund Policy
          </Link>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 1, color: '#007bff',fontWeight: 'bold' }}>
            For Freelancers
          </Typography>
          <Link href="/" sx={{ display: 'block', mb: 1, color: '#333', textDecoration: 'none', '&:hover': { color: '#007bff' } }}>
            Find Job
          </Link>
          <Link href="/" sx={{ display: 'block', mb: 1, color: '#333', textDecoration: 'none', '&:hover': { color: '#007bff' } }}>
            Refund Policy
          </Link>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 1, color: '#007bff' , fontWeight: 'bold'}}>
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Sri Lanka
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            071-2066122
          </Typography>
          <Typography variant="body2">worklink@gmail.com</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
