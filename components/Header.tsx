'use client';

import React from "react";

const Header = () => {
  return (
    <header 
      className="text-white h-[40px] w-full"
      style={{ backgroundColor: '#0081A7' }}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Navigasi Kiri - kosong */}
        <div></div>

        {/* Navigasi Kanan - kosong */}
        <div></div>
      </div>
    </header>
  );
};

export default Header;