
import  { useState } from 'react';
import RoleCard from './RoleCard';
import ActionButton from './ActionButton';
import './Signup.css';



export default function RoleSelection() {
  
  const [selectedRole ,setSelectedRole] = useState();
  
  return (
    <div className="role-selection">
      <RoleCard
        role="client"
        icon="📁"
        description="I’m a client, hiring for a project"
        isSelected={selectedRole === 'client'}
        onClick={() => setSelectedRole('client')}
      />
      <RoleCard
        role="freelancer"
        icon="💻"
        description="I’m a freelancer, looking for work"
        isSelected={selectedRole === 'freelancer'}
        onClick={() => setSelectedRole('freelancer')}
      />

      <ActionButton selectedRole={selectedRole} />
    </div>
  );
}


