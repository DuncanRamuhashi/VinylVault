import { useState, useEffect } from 'react';
import logo from './assets/yy-removebg-preview.png';
import {  FaUpload, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userIn, setUserIn] = useState(false);
  const navigate = useNavigate();
  const [burgerMenu, setBurgerMenu] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    setUserIn(!!loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserIn(false);
    navigate('/');
    setBurgerMenu(false); // Close menu on logout
  };

  return (
    <nav className="w-full shadow-md bg-gray-100 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Company Logo" className="h-16 w-auto object-contain" />
          </div>

          {/* Burger Menu Button */}
          <button
            className="text-red-800 text-3xl lg:hidden focus:outline-none"
            onClick={() => setBurgerMenu(!burgerMenu)}
            aria-label="Toggle Menu"
          >
            {burgerMenu ? '✖' : '☰'}
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-4 bg-gray-800 p-2 rounded-md">
            {userIn ? (
              <>
                <a href="/collections" className="nav-item">
                  <FaHome className="w-5 h-5" />
                </a>
                <a href="/upload" className="nav-item">
                  <FaUpload className="w-5 h-5" />
                </a>
                <button onClick={handleLogout} className="nav-item ">
                  LogOut
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="nav-item">Login</a>
                <a href="/register" className="nav-item">Register</a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {burgerMenu && (
        <div className="lg:hidden bg-gray-800 text-white absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-3">
          {userIn ? (
            <>
              <a href="/collections" className="mobile-nav-item" onClick={() => setBurgerMenu(false)}>
                <FaHome className="w-5 h-5 inline-block mr-2" /> Home
              </a>
              <a href="/upload" className="mobile-nav-item" onClick={() => setBurgerMenu(false)}>
                <FaUpload className="w-5 h-5 inline-block mr-2" /> Upload
              </a>
              <button onClick={handleLogout} className="mobile-nav-item">
                LogOut
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="mobile-nav-item" onClick={() => setBurgerMenu(false)}>Login</a>
              <a href="/register" className="mobile-nav-item" onClick={() => setBurgerMenu(false)}>Register</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
