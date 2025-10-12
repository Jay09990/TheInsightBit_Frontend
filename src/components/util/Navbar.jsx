import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo2.svg";
import hamburger from "../../assets/images/hamburger.svg";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user"); // 👈 track role
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));

      setIsLoggedIn(!!token);
      if (userData?.role) {
        setUserRole(userData.role);
      } else {
        setUserRole("user");
      }
    };

    // listen to our custom storage event
    window.addEventListener("storage-update", handleStorageChange);

    // check immediately on mount
    handleStorageChange();

    // cleanup
    return () => {
      window.removeEventListener("storage-update", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserRole("user");
      window.dispatchEvent(new Event("storage-update"));
      navigate("/");
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
            {/* 👇 Show login only if user is NOT logged in */}
            {!isLoggedIn && (
              <Link
                to="/login"
                className="bg-blue-500 text-white text-sm lg:text-base px-4 lg:px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Login
              </Link>
            )}

            {/* 👇 Admin Panel button (only for admins) */}
            {isLoggedIn && userRole === "admin" && (
              <Link
                to="/admin-panel"
                className="bg-purple-600 text-white text-sm lg:text-base px-4 lg:px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Create Post
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

      {/* Menu Component */}
      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Navbar;
