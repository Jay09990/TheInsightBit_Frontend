import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Login_page = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fix double-slash issue here
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "https://theinsightbit-backend.onrender.com/api/v1";

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
      });

      // ✅ Extract from response correctly
      const { user, accessToken, refreshToken } = response.data.data;
      console.log(user);
      

      // ✅ Save everything properly
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // ✅ Trigger event for Navbar update
      window.dispatchEvent(new Event("storage-update"));

      toast.success("✅ Login successful!");

      // ✅ Redirect based on role
      if (user.role === "admin") {
        navigate("/admin-panel");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);

      const backendMessage =
        error.response?.data?.message?.toLowerCase() ||
        error.response?.data?.data?.message?.toLowerCase() ||
        "";

      if (
        backendMessage.includes("not registered") ||
        backendMessage.includes("does not exist")
      ) {
        toast.error("🚫 You haven’t registered yet. Please create an account.");
      } else if (
        backendMessage.includes("invalid password") ||
        backendMessage.includes("incorrect password")
      ) {
        toast.error("❌ Incorrect password. Please try again.");
      } else if (backendMessage.includes("user not found")) {
        toast.error("⚠️ User not found. Please register first.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button className="mb-8 mt-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      <div className="max-w-md mx-auto bg-gray-200 rounded-3xl p-8 shadow-lg">
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
