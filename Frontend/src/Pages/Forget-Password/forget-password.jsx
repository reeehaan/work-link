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
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    role: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const [errors, setErrors] = useState({
    email: '',
    role: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast((prev) => ({ ...prev, open: false }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.role) {
      newErrors.role = 'Role is required';
    }

    if (!form.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (form.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          'http://localhost:3000/api/user/reset-password',
          {
            email: form.email,
            role: form.role,
            newPassword: form.newPassword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setToast({
          open: true,
          message: 'Password reset successful',
          severity: 'success',
        });

        // Redirect to login page after a delay
        setTimeout(() => {
          navigate('/login-form');
        }, 3000);
      } catch (error) {
        console.error(
          'Password reset error:',
          error.response?.data || error.message
        );
        let errorMessage = 'An error occurred while resetting password';

        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        }
        setToast({
          open: true,
          message: errorMessage,
          severity: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container
      maxWidth='xl'
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
            backgroundImage: 'url(/work_home_login.svg)',
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

        {/* Right Side (Reset Password Form) */}
        <Box
          sx={{
            flex: 1.2,
            p: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant='h3'
            component='h1'
            gutterBottom
            align='center'
            sx={{ fontWeight: 700, fontSize: 35 }}
          >
            Reset Password
          </Typography>

          <Typography
            variant='body1'
            align='center'
            sx={{ mb: 4, color: '#666' }}
          >
            Enter your details to reset your password
          </Typography>

          <Box component='form' onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label='Email'
                type='email'
                value={form.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                variant='outlined'
                size='medium'
                sx={{ borderRadius: 2 }}
              />

              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Role</InputLabel>
                <Select
                  value={form.role}
                  label='Role'
                  onChange={handleChange('role')}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value='client'>Client</MenuItem>
                  <MenuItem value='freelancer'>Freelancer</MenuItem>
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>

              <TextField
                fullWidth
                label='New Password'
                type='password'
                value={form.newPassword}
                onChange={handleChange('newPassword')}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                variant='outlined'
                size='medium'
                sx={{ borderRadius: 2 }}
              />

              <TextField
                fullWidth
                label='Confirm Password'
                type='password'
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                variant='outlined'
                size='medium'
                sx={{ borderRadius: 2 }}
              />

              <Button
                type='submit'
                variant='contained'
                size='large'
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
                  mt: 2,
                }}
              >
                {isLoading ? 'Processing...' : 'Reset Password'}
              </Button>
            </Stack>
          </Box>

          <Typography
            sx={{ mt: 4, textAlign: 'center', fontSize: '15px', color: '#666' }}
          >
            Remember your password?{' '}
            <Link
              href='/login-form'
              underline='hover'
              sx={{ fontWeight: 600, color: '#0c9cf5' }}
            >
              Login here
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
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ForgotPassword;
