import React from 'react';
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
  Paper,
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
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, boxShadow: 'none' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        
        <Typography variant="body2" color="text.primary" sx={{ mb: 3 }}>
          Enter your credentials to access your account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Stack>
        </Box>

        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" underline="hover">
            Sign up here
          </Link>
        </Typography>
      </Paper>
      <Snackbar 
        open={toast.open} 
        autoHideDuration={6000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseToast} 
          severity={toast.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginForm;