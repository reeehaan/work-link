import "./Jobs.css";

/**
 * @Params jobs 
 */
const Jobs = ({ jobs }) => {
  return (
    <section className="jobs">
      <h2>Jobs you might like</h2>
      {jobs.map((job) => (
        <div className="job-item" key={job.id}>
          <div className="job-title">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
          </div>
          <div className="job-tags"></div>
          <ol>
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
};

export default Jobs;
