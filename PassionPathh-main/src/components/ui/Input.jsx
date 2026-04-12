import React from 'react';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  icon: Icon
}) => {
  return (
    <div className={`relative ${className}`}>
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50">
          <Icon size={18} />
        </div>
      )}
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-surface-container border border-outline-variant/20 rounded-lg py-3 px-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-body text-sm placeholder:text-on-surface-variant/40 ${Icon ? 'pl-11' : ''}`}
      />
    </div>
  );
};

export default Input;
