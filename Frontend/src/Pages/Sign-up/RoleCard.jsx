
 export default function RoleCard({ role, icon, description, isSelected, onClick }) {
  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(role)}
    >
      <div className="icon">{icon}</div>
      <p>{description}</p>
      {isSelected && <div className="radio-selected"></div>}
    </div>
  );
}


