import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Paper,
  Stack
} from '@mui/material';
import { useState, useEffect } from 'react';

function SignupForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRole = location.state?.selectedRole;

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    selectedRole
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (!selectedRole) {
      navigate('/signup');
    }
  }, [selectedRole, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
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
        await axios.post('http://localhost:3000/api/user/register', form, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        // set the token in localstorage
        navigate('/login-form');
      } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        if (error.response?.data?.errors) {
          setErrors(prev => ({
            ...prev,
            ...error.response.data.errors
          }));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 , boxShadow: 'none'} }>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign up as {selectedRole}
        </Typography>
        
        <Typography variant="body2" color="text.primary" sx={{ mb: 3 }}>
          By signing up, you agree to the{' '}
          <Link href="#" underline="hover" >Terms of use</Link> and{' '}
          <Link href="#" underline="hover" >Privacy Policy</Link>.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                value={form.firstName}
                onChange={handleChange('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={form.lastName}
                onChange={handleChange('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>
            
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
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>
          </Stack>
        </Box>

        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/login-form" underline="hover">
            Log in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignupForm;