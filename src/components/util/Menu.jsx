import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Menu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  // Simulated login check — replace this with your real logic
  const isLoggedIn = !!localStorage.getItem("token"); 
  // Example: You can store token or user info in localStorage/sessionStorage

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Menu items based on login status
  const menuItems = isLoggedIn
    ? [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Profile", path: "/profile" },
        { label: "Logout", action: "logout" },
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Contact us", path: "/contact" },
        { label: "Category", path: "/category" },
      ];

  // Handle logout click
  const handleMenuClick = (item) => {
    if (item.action === "logout") {
      localStorage.removeItem("token"); // clear user session
      window.location.href = "/"; // redirect to home or login
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        ref={menuRef}
        className="bg-white ml-auto flex flex-col items-center justify-center rounded-3xl shadow-2xl mt-8 mr-8 transition-all duration-300"
        style={{ width: "50%", height: "45vh" }}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path || "#"}
            onClick={() => handleMenuClick(item)}
            className={`text-2xl font-semibold mb-8 cursor-pointer transition-colors ${
              item.action === "logout"
                ? "text-red-600 hover:text-red-700"
                : "text-black hover:text-blue-500"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
