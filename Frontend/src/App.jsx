import './App.css'
import { children, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import RoleSelection from './Pages/Sign-up/RoleSelection';
import SignupForm from './Pages/Sign-up/SignupForm';
import LoginForm from './Pages/Login/LoginForm';
import MainContent from './Pages/Home/MainContent';


const customTheme = createTheme({
  components: {
    MuiButton:{
      styleOverrides:{
        root:{
          fontWeight: 700
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#ffffff', 
      contrastText: '#00b3ff', // Text color on primary buttons
      dark: '#00b3ff', // Primary color 2
    },
    text: {
      primary: '#000000', // Main text color: Black
    },
    background: {
      default: '#f5f5f5', 
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Preferred font
    allVariants: {
      color: '#000000', 
    },
  },
});

function App() {
const [userType, setUserType] = useState('freelancer');
const Layout = ({children}) =>{
  return(
  <>
  <Navbar userType={userType}/>
  {children}
  <Footer/>
  </>
  ); 
  
}
  return(
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
    
    {/* <button onClick={() => setUserType('freelancer')}>Freelancer</button>
    <button onClick={() => setUserType('client')}>Client</button> */}
    
    
    <Router>
      <Routes>
        <Route path="/"element={<MainContent/>}> </Route>
        {/* <Route path="/" element={<Layout><Home/></Layout>}/> */}
        <Route path="/signup"element={<RoleSelection/>}> </Route>
        <Route path="/signup-form"element={<SignupForm/>}> </Route>
        <Route path="/login-form"element={<LoginForm/>}> </Route>
        <Route path="/home"element={<Layout><Home/></Layout>}> </Route>
      </Routes>
    </Router>
    </ThemeProvider>
    
  );
}

export default App
