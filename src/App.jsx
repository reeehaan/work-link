import './App.css'
import { useState } from 'react';

import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
const [userType, setUserType] = useState('freelancer');

  return(
    <>
    <button onClick={() => setUserType('freelancer')}>Freelancer</button>
    <button onClick={() => setUserType('client')}>Client</button>
    <Navbar userType={userType}/>
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App
