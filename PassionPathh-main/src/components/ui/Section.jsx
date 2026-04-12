import React from 'react';

const Section = ({ title, subtitle, children, className = '' }) => {
  return (
    <section className={`mb-16 last:mb-0 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-8 border-b border-outline-variant/10 pb-4">
          {title && <h2 className="font-headline text-3xl md:text-4xl italic text-on-surface mb-2">{title}</h2>}
          {subtitle && <p className="font-body text-on-surface-variant text-sm">{subtitle}</p>}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
};

export default Section;
