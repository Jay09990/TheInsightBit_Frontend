import React, { useState } from "react";
import logo from "../../assets/images/logo2.svg";
import hamburger from "../../assets/images/hamburger.svg";
import { Link } from "react-router-dom";
import Menu from "./Menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#373A3B] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="/" className="flex flex-shrink-0">
              <img
                src={logo}
                alt="insihbit"
                className="h-12 md:h-16 object-contain"
              />
            </Link>
          </div>

          {/* Right section with Login + Hamburger */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Login button */}
            <Link
              to="/login"
              className="bg-blue-500 text-white text-sm lg:text-base px-4 lg:px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </Link>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 hover:opacity-80 transition-opacity"
            >
              <img src={hamburger} alt="menu" className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Component */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
