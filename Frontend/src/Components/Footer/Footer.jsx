import { Box, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
          // Make it fixed at the bottom
        bottom: 0,         // Stick it to the bottom of the screen
        left: 0,           // Align it to the left of the screen
        width: '100%',     // Full width
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        p: 3,
        backgroundColor: '#f8f8f8',
        color: '#333',
          
      }}
    >
      <Box sx={{ maxWidth: 250 }}>
        <Typography variant="h6" sx={{ mb: 1, color: '#007bff' }}>
          WorkLink
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.5, mb: 2 }}>
          Powerful Freelance Marketplace System with the ability to change lives (Freelancers & Clients).
        </Typography>
        <Box>
          <Link href="/" sx={{ mr: 2, color: '#007bff', fontSize: '1.5rem', '&:hover': { color: '#0056b3' } }}>
            <i className="fab fa-instagram" />
          </Link>
          <Link href="/" sx={{ mr: 2, color: '#007bff', fontSize: '1.5rem', '&:hover': { color: '#0056b3' } }}>
            <i className="fab fa-facebook" />
          </Link>
          <Link href="/" sx={{ mr: 2, color: '#007bff', fontSize: '1.5rem', '&:hover': { color: '#0056b3' } }}>
            <i className="fab fa-twitter" />
          </Link>
          <Link href="/" sx={{ color: '#007bff', fontSize: '1.5rem', '&:hover': { color: '#0056b3' } }}>
            <i className="fab fa-linkedin" />
          </Link>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 1, color: '#007bff', fontWeight: 'bold' }}>
            For Clients
          </Typography>
          <Link href="/" sx={{ display: 'block', mb: 1, color: '#333', textDecoration: 'none', '&:hover': { color: '#007bff' } }}>
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
          <Typography variant="h6" sx={{ mb: 1, color: '#007bff', fontWeight: 'bold' }}>
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
          <Typography variant="h6" sx={{ mb: 1, color: '#007bff', fontWeight: 'bold' }}>
            Contact Us
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }} />
            <Typography variant="body2" sx={{ marginRight: '8px' }}>
              Sri Lanka
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <i className="fas fa-phone-alt" style={{ marginRight: '8px' }} />
            <Typography variant="body2" sx={{ marginRight: '8px' }}>
              071-2066122
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-envelope" style={{ marginRight: '8px' }} />
            <Typography variant="body2">worklink@gmail.com</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
