import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = "px-6 py-2.5 rounded-full font-label text-xs uppercase tracking-widest transition-all duration-200 font-bold flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm",
    outline: "border border-outline-variant/40 text-on-surface hover:border-primary hover:text-primary bg-transparent",
    ghost: "text-on-surface hover:text-primary hover:bg-surface-container-high bg-transparent"
  };

  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
