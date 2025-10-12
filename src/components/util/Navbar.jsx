import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo2.svg";
import hamburger from "../../assets/images/hamburger.svg";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // login state
  const navigate = useNavigate();

 useEffect(() => {
   const handleStorageChange = () => {
     const token = localStorage.getItem("accessToken");
     setIsLoggedIn(!!token);
   };

   // Listen to storage changes (works if multiple tabs)
   window.addEventListener("storage", handleStorageChange);

   // Also check on mount
   handleStorageChange();

   return () => window.removeEventListener("storage", handleStorageChange);
 }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Clear cookies/localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      navigate("/"); // redirect to home after logout
    }
  };

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

          {/* Right section */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Show Login only if not logged in */}
            {!isLoggedIn && (
              <Link
                to="/login"
                className="bg-blue-500 text-white text-sm lg:text-base px-4 lg:px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Login
              </Link>
            )}

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
      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout} // pass logout function
      />
    </header>
  );
};

export default Navbar;
