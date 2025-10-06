import React, { useState } from 'react'
import logo from "../../assets/images/logo2.svg"
import hamburger from "../../assets/images/hamburger.svg"
import { Link } from 'react-router-dom'
import Menu from './Menu'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#373A3B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link to="/" className="flex flex-shrink-0">
              <img 
                src={logo} 
                alt="insihbit" 
                className="h-12 md:h-16 object-contain"
              />           
            </Link>
            
            {/* Desktop Navigation */}
            {/* <nav className="hidden md:flex items-center gap-6 lg:gap-8"> */}
              {/* <Link to="/" className="text-sm lg:text-base font-medium hover:text-blue-400 transition-colors">Home</Link> */}
              {/* <Link to="/about" className="text-sm lg:text-base font-medium hover:text-blue-400 transition-colors">About</Link> */}
              {/* <Link to="/posts" className="text-sm lg:text-base font-medium hover:text-blue-400 transition-colors">Posts</Link> */}
              {/* <Link to="/contact" className="text-sm lg:text-base font-medium hover:text-blue-400 transition-colors">Contact</Link> */}
            {/* </nav> */}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Link to="/login" className="text-sm lg:text-base font-medium hover:text-blue-400 transition-colors">
              Login
            </Link>
            <Link to="/register" className="bg-blue-500 text-white text-sm lg:text-base px-4 lg:px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center">
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
  )
}

export default Navbar