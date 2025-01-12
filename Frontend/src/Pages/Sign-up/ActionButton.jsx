import PropTypes from 'prop-types';

export default function ActionButton({ selectedRole, onClick }) {
  return (
    <div className="action">
      <button className="action-button" onClick={onClick} >
        {selectedRole === 'client' ? 'Apply as a Client' : 'Apply as a Freelancer'}
      </button>
      <p>
        Already have an account? <a href="/login-form">Log In</a>
      </p>
    </div>
  );
}


ActionButton.propTypes = {
  selectedRole: PropTypes.string.isRequired,  
  onClick: PropTypes.func.isRequired          
};