import React from 'react';
import './Section.css';

const Section = () => {
  return (
    <div className="section">
      {/* onenma danna */}
      <div className="section-left">
        <img 
          src="./src/assets/MainContent/freelancer.avif" 
          alt="Freelancer working" 
          className="section-image" 
        />
      </div>

      {/* onenam danna */}
      <div className="section-right">
        <h1>Find great work</h1>
        <p>
          Meet clients you're excited to work with and take your career or business to new heights.
        </p>
        <ul>
          <li>Find opportunities for every stage of your freelance career</li>
          <li>Control when, where, and how you work</li>
          <li>Explore different ways to earn</li>
        </ul>
        <button className="btn">Find opportunities</button>
      </div>
    </div>
  );
}

export default Section;
