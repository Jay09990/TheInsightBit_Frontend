import React from 'react'
import logo from "../../assets/images/logo2.svg"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="bg-[#373A3B] text-white">
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

          {/* Login Button (visible on all screens) */}
          <div className="flex items-center gap-3 lg:gap-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white text-sm lg:text-base px-4 lg:px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
