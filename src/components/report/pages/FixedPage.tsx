import React from 'react';

interface Props {
  children: React.ReactNode;
  pageNumber?: number;
}

export const FixedPage: React.FC<Props> = ({ children, pageNumber }) => {
  return (
    <div 
      className="bg-white relative mx-auto"
      style={{
        width: '100%',
        maxWidth: '816px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{ 
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};
