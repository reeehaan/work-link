import React from 'react';
import './Navbar.css';

export default function  Navbar({userType}) {
  const freelancer = () => {
    return (
      <div className="navbar-links">
        <a href="/findFreelancer">Find Freelancer</a>
        <a href="/postProject">Post a project</a>
        <a href="/refund">Refund Policy</a>
        <a href="/messages">Messages</a>
      </div>
    );
    
  };

  const client = () => {
    return (
      <div className="navbar-links">
        <a href="/postjob">Post a job</a>
        <a href="/yourhires">Your hires</a>
        <a href="/report">Report</a>
        <a href="/messages">Messages</a>
      </div>
    );
    
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo"><a href="/home">Work<span>Link</span></a></div>
      {userType === 'freelancer' ? freelancer() : userType === 'client' ? client() : null}
      <input type="text" className="navbar-search" placeholder="Search" />
      <div className="navbar-profile"></div>
    </nav>
  );
};


