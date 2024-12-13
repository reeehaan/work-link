import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = () => {
    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      return decodedToken.exp > currentTime && decodedToken.role === allowedRole;
    } catch (error) {
      return false;
    }
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login-form" replace />;
};


export default ProtectedRoute;