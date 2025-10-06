import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your page components
import Home_page from '../pages/Home_page';
import Login_page from '../pages/Login_page';
import Register_page from '../pages/Register_page';
import NotFound from '../components/util/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home_page />} />
      <Route path="/about" element={<div className="p-8 text-center">About Page Coming Soon</div>} />
      <Route path="/posts" element={<div className="p-8 text-center">Posts Page Coming Soon</div>} />
      <Route path="/contact" element={<div className="p-8 text-center">Contact Page Coming Soon</div>} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login_page />} />
      <Route path="/register" element={<Register_page />} />
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;