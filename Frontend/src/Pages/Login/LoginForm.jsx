import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Link,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'error' // 'error' | 'warning' | 'info' | 'success'
  });

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(prev => ({ ...prev, open: false }));
  };

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await axios.post('http://localhost:3000/api/user/login', form, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        // Store the access token in localStorage
        localStorage.setItem('accessToken', response.data.token);

        // Navigate to dashboard or home page after successful login
        navigate(`/${response.data.role}`);
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        let errorMessage = 'An error occurred during login';
        
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        }
          setToast({
            open: true,
            message: errorMessage,
            severity: 'error'
          });
        
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7f9fc',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          boxShadow: 5,
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        {/* Left Side (Animated Image) */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url(../../public/work_home_login.svg)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: { xs: 200, md: 'auto' },
            animation: 'fadeIn 1.2s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateX(-60px)' },
              to: { opacity: 1, transform: 'translateX(0)' },
            },
          }}
        />

        {/* Right Side (Login Form) */}
        <Box
          sx={{
            flex: 1.2,
            p: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, fontSize: 35 }}>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={4}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                size="medium"
                sx={{ borderRadius: 2 }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
                size="medium"
                sx={{ borderRadius: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  height: '60px',
                  fontSize: '16px',
                  borderRadius: 3,
                  backgroundColor: '#0c9cf5',
                  '&:hover': {
                    backgroundColor: '#0077cc',
                  },
                  boxShadow: '0 6px 8px rgba(0, 123, 255, 0.3)',
                }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </Stack>
          </Box>

          <Typography sx={{ mt: 4, textAlign: 'center', fontSize: '15px', color: '#666' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" underline="hover" sx={{ fontWeight: 600, color: '#0c9cf5' }}>
              Sign up here
            </Link>
          </Typography>
        </Box>
      </Box>

      <Snackbar
      open={toast.open}
      autoHideDuration={6000}
      onClose={handleCloseToast}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
    >
        <Alert onClose={handleCloseToast} severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  
  );
};

export default LoginForm;