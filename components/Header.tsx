
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-[#d0d7de] py-6 shadow-sm">
      <div className="flex items-center justify-center gap-4">
        <div className="w-10 h-10 bg-[#1f3a5f] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xl font-bold font-sans">8</span>
        </div>
        <h1 className="text-[#1f3a5f] text-2xl font-semibold tracking-wide">
          Grade 8 ICT Learning Studio
        </h1>
      </div>
    </header>
  );
};

export default Header;
