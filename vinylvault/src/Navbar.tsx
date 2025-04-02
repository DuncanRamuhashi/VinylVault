import React from 'react';
import logo from './assets/yy-removebg-preview.png';

const Navbar = () => {
  return (
    <nav className="w-full  shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="Company Logo" 
              className="h-20 w-auto object-contain"
            />
          </div>

        
          <div className="flex items-center space-x-1 bg-gray-800 rounded-md ">
            <a 
              href="/login"
              className="text-gray-100 hover:bg-red-800 px-3 py-2 rounded-md  text-sm font-medium transition-colors  "
            >
              Login
            </a>
            <a 
              href="/register"
              className=" text-gray-100 hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium transition-colors "
            >
              Register
            </a>
            
            <a 
              href="/register"
              className=" bg-red-800 text-gray-100 hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium transition-colors "
            >
              LogOut
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;