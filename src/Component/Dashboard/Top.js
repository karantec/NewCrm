import React from 'react';
import { FaUser, FaBell, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TopBar = ({ toggleSidebar }) => {
  return (
    <div className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-lg">
      {/* Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 text-white"
      >
        <FaBars className="w-6 h-6" />
      </button>

      {/* Logo or Title */}
      <h1 className="text-xl font-semibold tracking-wide text-gray-200 hidden lg:block">
        NationNews

      </h1>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        <button className="p-2 bg-gray-700 rounded-full text-sm font-medium text-white hover:bg-gray-600 transition duration-300 ease-in-out">
          <FaBell className="w-5 h-5" />
        </button>
        <button className="p-2 bg-gray-700 rounded-full text-sm font-medium text-white hover:bg-gray-600 transition duration-300 ease-in-out">
          <FaUser className="w-5 h-5" />
        </button>
        <Link to="/login"><button className="p-2 bg-red-600 rounded-full text-sm font-medium text-white hover:bg-red-500 transition duration-300 ease-in-out">
          <FaSignOutAlt className="w-5 h-5" />
        </button></Link>
      </div>
    </div>
  );
};

export default TopBar;
