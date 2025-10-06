import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Menu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' }
  ];

  return (
    <div className="fixed inset-0 z-50">
      <div
        ref={menuRef}
        className="bg-white ml-auto flex flex-col items-center justify-center rounded-3xl shadow-2xl mt-8 mr-8 transition-all duration-300"
        style={{ width: '50%', height: '45vh' }}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={onClose}
            className="text-2xl font-semibold text-black mb-8 cursor-pointer hover:text-blue-500 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}