import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your page components
import Home_page from '../pages/Home_page';
import Login_page from '../pages/Login_page';
import Register_page from '../pages/Register_page';
import ContactUs from '../pages/ContactUs';
import Category from '../pages/Category';
import NotFound from '../components/util/NotFound';
import Blog from '../pages/Blog';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home_page />} />
      <Route path="/contact" element={<ContactUs/>} />
      <Route path="/category" element={<Category/>} />
      <Route path="/blog/:id" element={<Blog />} />
            
      {/* Auth Routes */}
      <Route path="/login" element={<Login_page />} />
      <Route path="/register" element={<Register_page />} />
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;