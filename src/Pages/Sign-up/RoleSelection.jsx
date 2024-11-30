
import React from 'react';
import RoleCard from './RoleCard';
import './Signup.css';

export default function RoleSelection({ selectedRole, handleRoleChange }) {
  return (
    <div className="role-selection">
      <RoleCard
        role="client"
        icon="📁"
        description="I’m a client, hiring for a project"
        isSelected={selectedRole === 'client'}
        onClick={handleRoleChange}
      />
      <RoleCard
        role="freelancer"
        icon="💻"
        description="I’m a freelancer, looking for work"
        isSelected={selectedRole === 'freelancer'}
        onClick={handleRoleChange}
      />
    </div>
  );
}


