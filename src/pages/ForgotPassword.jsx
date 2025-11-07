import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Mail, Lock, KeyRound } from "lucide-react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // NOTE: This value is also stored in .env as VITE_API_BASE_URL; it's safe to remove this hard-coded value and use import.meta.env.VITE_API_BASE_URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_RENDER;
  const API_BASE_URL_LOCAL = import.meta.env.VITE_API_BASE_URL_LOCAL;

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

  // Step 1: Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      return toast.error("Please enter your email");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/verification/forgot-password`, {
        email: formData.email,
      });

      toast.success("📧 OTP sent to your email!");
      setStep(2);
      startResendTimer();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/verification/forgot-password`, {
        email: formData.email,
      });

      toast.success("📧 OTP resent successfully!");
      startResendTimer();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = (e) => {
    e.preventDefault();

    if (!formData.otp || formData.otp.length !== 6) {
      return toast.error("Please enter the 6-digit OTP");
    }

    setStep(3);
    toast.success("✅ OTP verified! Set your new password");
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      return toast.error("Please fill in both password fields");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (formData.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/verification/reset-password`, {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      toast.success("✅ Password reset successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
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
            {step === 2 && <KeyRound className="w-7 h-7 text-white" />}
            {step === 3 && <Lock className="w-7 h-7 text-white" />}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-6 gap-2">
          <div className={`h-2 w-16 rounded-full ${step >= 1 ? "bg-purple-600" : "bg-gray-300"}`}></div>
          <div className={`h-2 w-16 rounded-full ${step >= 2 ? "bg-purple-600" : "bg-gray-300"}`}></div>
          <div className={`h-2 w-16 rounded-full ${step >= 3 ? "bg-purple-600" : "bg-gray-300"}`}></div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {step === 1 && "Forgot Password?"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h1>
        <p className="text-center text-gray-700 mb-6">
          {step === 1 && "Enter your email to receive a verification code"}
          {step === 2 && "We sent a 6-digit code to your email"}
          {step === 3 && "Enter your new password"}
        </p>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
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
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white font-semibold py-4 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2 text-center">
                Enter 6-digit code sent to
              </label>
              <p className="text-center text-purple-600 font-medium mb-4">{formData.email}</p>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                maxLength="6"
                className="w-full px-4 py-4 bg-white rounded-lg text-center text-3xl tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="000000"
                required
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

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Min. 6 characters"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Re-enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white font-semibold py-4 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;