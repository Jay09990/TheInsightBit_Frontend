  import React from "react";
  import { Routes, Route, Navigate } from "react-router-dom";

  // Import your page components
  import Home_page from "../pages/Home_page";
  import Login_page from "../pages/Login_page";
  import Register_page from "../pages/Register_page";
  import ContactUs from "../pages/ContactUs";
  // import Category from "../pages/Category";
  import NotFound from "../components/util/NotFound";
  import Blog from "../pages/Blog";
  import AdminPanel from "../pages/AdminPanel";
  import AdminPosts from "../pages/AdminPosts";
  import OAuthSuccess from "../pages/OAuthSuccess"; // ✅ Add this import
  import ForgotPassword from "../pages/ForgotPassword";
  import GoogleLoadingPage from "../components/util/GoogleLoadingPage.jsx"


  // Protected route wrapper for admin
  const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!token || user?.role !== "admin") {
      // Not logged in or not admin → redirect to home
      return <Navigate to="/" replace />;
    }

    return children;
  };

  const AppRoutes = () => {
    // ✅ Define user here
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home_page />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* <Route path="/category" element={<Category />} /> */}
        <Route path="/blog/:id" element={<Blog user={user} />} />
        <Route path="/auth/loading" element={<GoogleLoadingPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login_page />} />
        <Route path="/register" element={<Register_page />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} /> {/* ✅ Add this route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Routes */}
        <Route
          path="/admin-panel"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-posts"
          element={
            <AdminRoute>
              <AdminPosts />
            </AdminRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };

  export default AppRoutes;