import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaHome, FaBars } from 'react-icons/fa';

const Header = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="w-full">
      <header className="w-full bg-white border-b border-gray-200 p-4 flex justify-between items-center top-0">
        <div className="flex items-center">
          <FaHome
            className="text-gray-600 cursor-pointer"
            size={24}
            onClick={handleDashboard}
          />
        </div>
        <div className="flex items-center relative">
          <FaBars
            className="text-gray-600 cursor-pointer"
            size={24}
            onClick={() => setShowDropdown(!showDropdown)}
          />
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
