import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Stack,
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
        backgroundImage: 'url(../../public/work_home.svg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: 300, md: 'auto' }, 
        animation: 'fadeIn 1.2s ease-in-out', 
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateX(-60px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      }}
    />

    {/* Right Side (Sign Up Form) */}
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
        Sign up as {selectedRole}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 4, textAlign: 'center', fontSize: '16px' }}
      >
        By signing up, you agree to the{' '}
        <Link href="#" underline="hover">
          Terms of use
        </Link>{' '}
        and{' '}
        <Link href="#" underline="hover">
          Privacy Policy
        </Link>.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={4}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <TextField
              fullWidth
              label="First Name"
              value={form.firstName}
              onChange={handleChange('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName}
              variant="outlined"
              size="medium"
              sx={{ borderRadius: 2 }}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={form.lastName}
              onChange={handleChange('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName}
              variant="outlined"
              size="medium"
              sx={{ borderRadius: 2 }}
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
              height: '60px', // Adjust the button height
              fontSize: '16px', // Adjust the font size
              borderRadius: 3, // Round the corners more
              backgroundColor: '#0c9cf5',
              '&:hover': {
                backgroundColor: '#0077cc',
              },
              boxShadow: '0 6px 8px rgba(0, 123, 255, 0.3)',
            }}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </Button>
        </Stack>
      </Box>

      <Typography sx={{ mt: 4, textAlign: 'center', fontSize: '15px', color: '#666' }}>
        Already have an account?{' '}
        <Link href="/login-form" underline="hover" sx={{ fontWeight: 600, color: '#0c9cf5' }}>
          Log in
        </Link>
      </Typography>
    </Box>
  </Box>
</Container>


  
  );
}

export default SignupForm;