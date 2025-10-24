import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, MapPin } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Register_page = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    otp: "",
    userName: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const API_BASE_URL = "https://theinsightbit-backend.onrender.com/api/v1";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ✅ Enhanced Error Handler for OTP Sending
  const handleOTPError = (error) => {
    if (!error.response) {
      if (error.message === "Network Error") {
        return toast.error("🌐 Network error. Please check your internet connection.");
      }
      return toast.error("⚠️ Unable to connect to server. Please try again later.");
    }

    const status = error.response.status;
    const message = error.response?.data?.message || "";
    const messageLower = message.toLowerCase();

    switch (status) {
      case 400:
        if (messageLower.includes("already registered") || messageLower.includes("already exists")) {
          return toast.error("📧 This email is already registered. Please login instead.");
        }
        if (messageLower.includes("invalid email")) {
          return toast.error("📧 Invalid email format. Please check your email.");
        }
        if (messageLower.includes("required")) {
          return toast.error("📧 Email and name are required.");
        }
        return toast.error(message || "❌ Invalid request. Please check your inputs.");

      case 429:
        return toast.error("⏳ Too many requests. Please wait a moment before trying again.");

      case 500:
        if (messageLower.includes("email") || messageLower.includes("send")) {
          return toast.error("📧 Failed to send email. Please check your email address.");
        }
        return toast.error("🔧 Server error. Please try again later.");

      case 503:
        return toast.error("⚙️ Email service temporarily unavailable. Please try again later.");

      default:
        return toast.error(message || "⚠️ Failed to send OTP. Please try again.");
    }
  };

  // ✅ Enhanced Error Handler for Registration
  const handleRegistrationError = (error) => {
    if (!error.response) {
      if (error.message === "Network Error") {
        return toast.error("🌐 Network error. Please check your internet connection.");
      }
      return toast.error("⚠️ Unable to connect to server. Please try again later.");
    }

    const status = error.response.status;
    const message = error.response?.data?.message || "";
    const messageLower = message.toLowerCase();

    switch (status) {
      case 400:
        if (messageLower.includes("otp") && messageLower.includes("expired")) {
          toast.error("⏰ OTP has expired. Please request a new one.");
          return setStep(1);
        }
        if (messageLower.includes("invalid otp") || messageLower.includes("incorrect otp")) {
          return toast.error("❌ Invalid OTP. Please check and try again.");
        }
        if (messageLower.includes("username") && messageLower.includes("taken")) {
          return toast.error("👤 Username already taken. Please choose another.");
        }
        if (messageLower.includes("email") && messageLower.includes("exists")) {
          return toast.error("📧 Email already registered. Please login instead.");
        }
        if (messageLower.includes("password") && messageLower.includes("weak")) {
          return toast.error("🔒 Password is too weak. Use a stronger password.");
        }
        return toast.error(message || "❌ Invalid data. Please check your inputs.");

      case 404:
        if (messageLower.includes("user") || messageLower.includes("not found")) {
          toast.error("❓ Session expired. Please request OTP again.");
          return setStep(1);
        }
        return toast.error("❓ Registration session not found. Please start over.");

      case 409:
        if (messageLower.includes("username")) {
          return toast.error("👤 Username already exists. Please choose another.");
        }
        if (messageLower.includes("email")) {
          return toast.error("📧 Email already registered. Please login instead.");
        }
        return toast.error("⚠️ " + message);

      case 429:
        return toast.error("⏳ Too many attempts. Please try again later.");

      case 500:
        return toast.error("🔧 Server error. Please try again later.");

      case 503:
        return toast.error("⚙️ Service temporarily unavailable. Please try again later.");

      default:
        return toast.error(message || "⚠️ Registration failed. Please try again.");
    }
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName.trim()) {
      return toast.error("👤 Please enter your full name");
    }

    if (formData.fullName.trim().length < 2) {
      return toast.error("👤 Name must be at least 2 characters long");
    }

    if (!formData.email.trim()) {
      return toast.error("📧 Please enter your email address");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("📧 Please enter a valid email address");
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/verification/send-otp`, {
        email: formData.email.trim().toLowerCase(),
        fullName: formData.fullName.trim(),
      });

      toast.success("📧 Verification code sent to your email!");
      setStep(2);
      startResendTimer();
    } catch (error) {
      console.log(error)
      // console.error("Send OTP Error:", error);
      const message = error.response?.data?.message?.toLowerCase() || "";
      // ⛔ Prevent infinite resend loop and lock user if email exists
      if (message.includes(400) || message.includes("already registerd")) {
        toast.error("📧 This email is already registered. Please log in instead.");
        setStep(1);
        setLoading(false);
        return; // ✅ stop execution here
      }
      handleOTPError(error);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/verification/send-otp`, {
        email: formData.email.trim().toLowerCase(),
        fullName: formData.fullName.trim(),
      });

      toast.success("📧 OTP resent successfully!");
      startResendTimer();
    } catch (error) {
      console.error("Resend OTP Error:", error);
      handleOTPError(error);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = (e) => {
    e.preventDefault();

    if (!formData.otp) {
      return toast.error("🔢 Please enter the OTP");
    }

    if (formData.otp.length !== 6) {
      return toast.error("🔢 OTP must be 6 digits");
    }

    if (!/^\d+$/.test(formData.otp)) {
      return toast.error("🔢 OTP must contain only numbers");
    }

    setStep(3);
    toast.success("✅ OTP verified! Complete your profile");
  };

  // Step 3: Complete Registration
  const handleCompleteRegistration = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.userName.trim()) {
      return toast.error("👤 Please enter a username");
    }

    if (formData.userName.trim().length < 3) {
      return toast.error("👤 Username must be at least 3 characters long");
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.userName)) {
      return toast.error("👤 Username can only contain letters, numbers, and underscores");
    }

    if (!formData.password) {
      return toast.error("🔒 Please enter a password");
    }

    if (formData.password.length < 6) {
      return toast.error("🔒 Password must be at least 6 characters long");
    }

    if (!formData.confirmPassword) {
      return toast.error("🔒 Please confirm your password");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("🔒 Passwords do not match");
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/verification/verify-otp`, {
        email: formData.email.trim().toLowerCase(),
        otp: formData.otp,
        password: formData.password,
        userName: formData.userName.trim().toLowerCase(),
        address: formData.address.trim(),
      });

      const { user, accessToken, refreshToken } = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      window.dispatchEvent(new Event("storage-update"));
      toast.success(`✅ Welcome to InsightBit, ${user.fullName}!`);

      // Small delay for better UX
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Registration Error:", error);
      handleRegistrationError(error);
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
        {/* Header */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
            {step === 1 && <Mail className="w-7 h-7 text-white" />}
            {step === 2 && <Lock className="w-7 h-7 text-white" />}
            {step === 3 && <User className="w-7 h-7 text-white" />}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-6 gap-2">
          <div className={`h-2 w-16 rounded-full transition-colors ${step >= 1 ? "bg-purple-600" : "bg-gray-300"}`}></div>
          <div className={`h-2 w-16 rounded-full transition-colors ${step >= 2 ? "bg-purple-600" : "bg-gray-300"}`}></div>
          <div className={`h-2 w-16 rounded-full transition-colors ${step >= 3 ? "bg-purple-600" : "bg-gray-300"}`}></div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {step === 1 && "Create your account"}
          {step === 2 && "Verify your email"}
          {step === 3 && "Complete your profile"}
        </h1>
        <p className="text-center text-gray-700 mb-6">
          {step === 1 && "Enter your details to get started"}
          {step === 2 && "We sent a 6-digit code to your email"}
          {step === 3 && "Just a few more details"}
        </p>

        {/* Step 1: Email and Name */}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div className="mb-5">
              <label className="block text-gray-900 font-medium mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="John Doe"
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="john@example.com"
                disabled={loading}
              />
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
                  Sending Code...
                </span>
              ) : (
                "Send Verification Code"
              )}
            </button>

            <p className="text-center text-gray-700 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 underline hover:text-purple-700">
                Log In
              </Link>
            </p>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2 text-center">
                Enter 6-digit code sent to
              </label>
              <p className="text-center text-purple-600 font-medium mb-4 break-words">{formData.email}</p>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                maxLength="6"
                className="w-full px-4 py-4 bg-white rounded-lg text-center text-3xl tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="000000"
                disabled={loading}
              />
              <div className="text-center mt-4">
                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in <span className="font-bold text-purple-600">{resendTimer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sm text-purple-600 underline hover:text-purple-700 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Resend OTP"}
                  </button>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-4 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Verify & Continue
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full mt-3 text-gray-600 underline hover:text-gray-800"
            >
              Change Email
            </button>
          </form>
        )}

        {/* Step 3: Complete Registration */}
        {step === 3 && (
          <form onSubmit={handleCompleteRegistration}>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="johndoe123"
                disabled={loading}
              />
              <p className="text-xs text-gray-600 mt-1">Only letters, numbers, and underscores allowed</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Min. 6 characters"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Re-enter password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your address"
                disabled={loading}
              />
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
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Register_page;