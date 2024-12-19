import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem('accessToken');
  
  const isAuthenticated = () => {
    if (!token) return false;
    
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    return decodedToken.exp > currentTime && decodedToken.role === allowedRole;
  };

  // No need for try/catch since jwtDecode will throw if token is invalid
  // and we want to redirect to login in that case anyway
  try {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login-form" replace />;
  } catch {
    return <Navigate to="/login-form" replace />;
  }
};

ProtectedRoute.propTypes = {
  allowedRole: PropTypes.string.isRequired
};

export default ProtectedRoute;