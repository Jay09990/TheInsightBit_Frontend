import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Menu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem("token");
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.role === "admin";

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

  let menuItems = [];

  if (isLoggedIn && isAdmin) {
    menuItems = [
      { label: "Dashboard", path: "/" },
      { label: "Admin Panel", path: "/admin-panel" },
      { label: "Contact Us", path: "/contact" },
      { label: "Logout", action: "logout" },
    ];
  } else if (isLoggedIn && !isAdmin) {
    menuItems = [
      { label: "Dashboard", path: "/" },
      { label: "Contact Us", path: "/contact" },
      { label: "Logout", action: "logout" },
    ];
  } else {
    menuItems = [
      { label: "Home", path: "/" },
      { label: "Contact Us", path: "/contact" },
    ];
  }

  const handleMenuClick = (item) => {
    if (item.action === "logout") {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Transparent overlay to close on outside click */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Floating small menu */}
      <div
        ref={menuRef}
        className={`absolute top-10 left-0 bg-white flex flex-col items-center justify-center shadow-2xl transform transition-transform duration-500 ease-in-out rounded-r-3xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          width: "20vw",
          height: "30vh",
          minWidth: "180px",
          minHeight: "160px",
        }}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path || "#"}
            onClick={() => handleMenuClick(item)}
            className={`text-lg font-semibold mb-4 cursor-pointer transition-all duration-500 ${
              item.action === "logout"
                ? "text-red-600 hover:text-red-700"
                : "text-gray-800 hover:text-blue-500"
            } ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
            style={{
              transitionDelay: `${isOpen ? index * 120 : 0}ms`,
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
