import React from 'react';

const Card = ({ children, className = '', onClick, hoverable = false }) => {
  const baseClasses = "bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 transition-colors duration-200";
  const hoverClasses = hoverable || onClick ? "hover:bg-surface-container-high hover:border-primary/20 cursor-pointer" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
