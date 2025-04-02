import React, { useState, useEffect } from 'react';
import logo from './assets/yy-removebg-preview.png';
import { FaRegUser,FaUpload,FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userIn, setUserIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user is logged in (Example: Using localStorage)
    const loggedIn = localStorage.getItem("user");
    setUserIn(!!loggedIn); // Convert to boolean
  }, []); // Runs only on component mount

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from storage
    setUserIn(false); // Update state
    navigate('/');
  };

  return (
    <nav className="w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="Company Logo" 
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 bg-gray-800 rounded-md">
            {userIn ? (
              <>
                                            <a 
                  href="/collections"
                  className="bg-red-800 text-gray-100 hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <FaHome className='w-13 h-4' />
                </a>
                              <a 
                  href="/upload"
                  className="bg-red-800 text-gray-100 hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <FaUpload className='w-13 h-4' />
                </a>
                
      
                <button 
                  onClick={handleLogout}
                  className="bg-red-800  text-gray-100 hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/login"
                  className="text-gray-100 hover:bg-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </a>
                <a 
                  href="/register"
                  className="text-gray-100 hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
