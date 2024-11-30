export default function ActionButton({ selectedRole }) {
  return (
    <div className="action">
      <button className="action-button">
        {selectedRole === 'client' ? 'Apply as a Client' : 'Apply as a Freelancer'}
      </button>
      <p>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
}

