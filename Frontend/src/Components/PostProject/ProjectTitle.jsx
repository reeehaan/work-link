import PropTypes from 'prop-types';
import styles from './Title.module.css';


const ProjectTitle = ({ projectTitle, setProjectTitle }) => {
  

  const handelProjectTitle = (event) =>{
    setProjectTitle(event.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
       
        <div className={styles.leftSection}>
          <p>post project</p>
          <h2>Start with the strong title.</h2>
          <p>
            This helps your job post stand out to the right candidates. It’s the first thing
            they’ll see, so make it count!
          </p>
        </div>

        
        <div className={styles.rightSection}>
          <p className={styles.title}>Write the title for your project post</p>
          <input 
          type="text" 
          placeholder="Project title post" 
          value={projectTitle}
          onChange={handelProjectTitle}
          />
          <p>Example Titles</p>
          <ul>
            <li>For Building a Responsive WordPress Site with Booking/Payment</li>
            <li>Build an E-commerce website with a payment gateway</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

ProjectTitle.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  setProjectTitle: PropTypes.func.isRequired,
};

export default ProjectTitle;
