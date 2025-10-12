import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const Login_page = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "https://theinsightbit-backend.onrender.com/api/v1";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      // Extract user + token from backend
      const { user, accessToken } = response.data.data;

      // Save login data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);

      alert("✅ Login successful!");
      navigate("/"); // redirect to homepage or dashboard
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Back Button */}
      <button className="mb-8 mt-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Login Card */}
      <div className="max-w-md mx-auto bg-gray-200 rounded-3xl p-8 shadow-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Log In to your account
        </h1>
        <p className="text-center text-gray-700 mb-8">
          or{" "}
          <Link to="/register" className="text-purple-600 underline">
            create a new account
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-900 font-medium mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-900 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-gray-400 mr-2"
              />
              <span className="text-gray-900">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-purple-600 underline">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-semibold py-4 rounded-xl hover:bg-purple-700 transition-colors"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login_page;
