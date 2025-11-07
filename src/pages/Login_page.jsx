import React, { useState, useEffect } from "react";
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

  // NOTE: This value is also stored in .env as VITE_API_BASE_URL; it's safe to remove this hard-coded value and use import.meta.env.VITE_API_BASE_URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_RENDER;
  const API_BASE_URL_LOCAL = import.meta.env.VITE_API_BASE_URL_LOCAL;  

  // Load saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Enhanced Error Handler
  const handleLoginError = (error) => {
    // Network errors
    if (!error.response) {
      if (error.message === "Network Error") {
        return toast.error("🌐 Network error. Please check your internet connection.");
      }
      return toast.error("⚠️ Unable to connect to server. Please try again later.");
    }

    const status = error.response.status;
    const message = error.response?.data?.message || "";
    const messageLower = message.toLowerCase();

    // Handle specific status codes
    switch (status) {
      case 400:
        if (messageLower.includes("email") && messageLower.includes("required")) {
          return toast.error("📧 Email is required");
        }
        if (messageLower.includes("password") && messageLower.includes("required")) {
          return toast.error("🔒 Password is required");
        }
        if (messageLower.includes("invalid") && messageLower.includes("email")) {
          return toast.error("📧 Invalid email format");
        }
        return toast.error(message || "❌ Invalid request. Please check your inputs.");

      case 401:
        if (messageLower.includes("password")) {
          return toast.error("🔒 Incorrect password. Please try again.");
        }
        if (messageLower.includes("credentials")) {
          return toast.error("❌ Invalid credentials. Please check your email and password.");
        }
        return toast.error("🔐 Authentication failed. Please check your credentials.");

      case 403:
        if (messageLower.includes("verify") || messageLower.includes("verification")) {
          return toast.error("⚠️ Please verify your email before logging in.");
        }
        if (messageLower.includes("banned") || messageLower.includes("suspended")) {
          return toast.error("🚫 Your account has been suspended. Contact support.");
        }
        return toast.error("🚫 Access denied. " + message);

      case 404:
        if (messageLower.includes("user") || messageLower.includes("account")) {
          return toast.error("👤 Account not found. Please register first.");
        }
        return toast.error("❓ User not found. Please check your email.");

      case 429:
        return toast.error("⏳ Too many login attempts. Please try again later.");

      case 500:
        return toast.error("🔧 Server error. Please try again later.");

      case 503:
        return toast.error("⚙️ Service temporarily unavailable. Please try again later.");

      default:
        return toast.error(message || "⚠️ Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email.trim()) {
      return toast.error("📧 Please enter your email address");
    }

    if (!password) {
      return toast.error("🔒 Please enter your password");
    }

    if (!isValidEmail(email)) {
      return toast.error("📧 Please enter a valid email address");
    }

    if (password.length < 6) {
      return toast.error("🔒 Password must be at least 6 characters long");
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email: email.trim().toLowerCase(),
        password
      });

      const { user, accessToken, refreshToken } = response.data.data;

      // Handle Remember Me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      window.dispatchEvent(new Event("storage-update"));
      toast.success(`✅ Welcome back, ${user.fullName || user.userName}!`);

      // Small delay for better UX
      setTimeout(() => {
        navigate(user.role === "admin" ? "/admin-panel" : "/");
      }, 500);

    } catch (error) {
      console.error("Login Error:", error);
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // NOTE: This value is also stored in .env as VITE_GOOGLE_AUTH_URL; it's safe to remove this hard-coded value and use import.meta.env.VITE_GOOGLE_AUTH_URL
    window.location.href = `${import.meta.env.VITE_GOOGLE_AUTH_URL}`;
    navigate("/auth/loading");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <button className="mb-8 mt-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      <div className="max-w-md mx-auto bg-gray-200 rounded-3xl p-8 shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Log In to your account</h1>
        <p className="text-center text-gray-700 mb-4">
          or <Link to="/register" className="text-purple-600 underline hover:text-purple-700">create a new account</Link>
        </p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full mb-6 bg-white border border-gray-300 py-3 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-400"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-200 text-gray-600">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-900 font-medium mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-900 font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-gray-400 mr-2 cursor-pointer"
                disabled={loading}
              />
              <span className="text-gray-900">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-purple-600 underline hover:text-purple-700">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-semibold py-4 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login_page;