import React from 'react';
import './Jobs.css';

const Jobs = () => {
  return (
    <section className="jobs">
      <h2>Jobs you might like</h2>
      <div className="jobs-list">
        {/* Add Job components dynamically */}
        <div className="job-item">Job 1</div>
        <div className="job-item">Job 2</div>
      </div>
    </section>
  );
};

export default Jobs;
