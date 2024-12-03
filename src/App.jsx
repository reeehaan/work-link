import './App.css'
import { Children, useState } from 'react';

import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import RoleSelection from './Pages/Sign-up/RoleSelection';
import SignupForm from './Pages/Sign-up/SignupForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    <>
    <button onClick={() => setUserType('freelancer')}>Freelancer</button>
    <button onClick={() => setUserType('client')}>Client</button>
    
    
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>}/>
        <Route path="/sign-up"element={<RoleSelection/>}> </Route>
        <Route path="/signup-form"element={<SignupForm/>}> </Route>
      </Routes>
    </Router>
    
    </>
  );
}

export default App
