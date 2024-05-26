import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/profile');
  }


  return (
    <div className="w-full">
      <header className="w-full bg-white border-b border-gray-200 p-4 flex justify-end items-center top-0">
        <div className="flex items-center relative">
          <div
            className="w-10 h-10 bg-yellow-400 rounded-full cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          ></div>
          {showDropdown && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 p-2 rounded shadow-lg">
              <button className="whitespace-nowrap" onClick={handleLogout}>Log out</button>
              <button className="whitespace-nowrap" onClick={handleProfile}>Meu Perfil</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
