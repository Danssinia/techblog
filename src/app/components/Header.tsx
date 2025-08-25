'use client'
import React, { useState } from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navLinks =[
    {menu:'HOME',url:"/"},
    {menu:'ABOUT',url:"/pages/aboutus"},
    {menu:'BLOGS',url:"/pages/blogs"},
    {menu:'CREATE',url:"/pages/create"},
    {menu:'CONTACT',url:"/pages/contact"},
  ]
  //const navLinks: string[] = ['HOME', 'ABOUT', 'BLOGS', 'CREATE','CONTACT'];

  return (
    <nav className={`bg-[#bbd4df] shadow-lg ${className}  `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">TechBlog</h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link,index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
                >
                  {link.menu}
                </a>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link,index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.menu}
                </a>
              ))}
                <button className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200">
                Login
              </button>              
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;