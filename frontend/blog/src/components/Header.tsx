import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-blue-300">
            My Blog
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-blue-300">
            Home
          </a>
          <a href="/about" className="hover:text-blue-300">
            About
          </a>
          <a href="/services" className="hover:text-blue-300">
            Services
          </a>
          <a href="/contact" className="hover:text-blue-300">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
    );
};

export default Header;