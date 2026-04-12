import React from 'react';

const ProgressBar = ({ progress, className = '' }) => {
  const percentage = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`w-full h-2 bg-surface-container-highest rounded-full overflow-hidden ${className}`}>
      <div 
        className="h-full bg-primary transition-all duration-500 ease-out" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
