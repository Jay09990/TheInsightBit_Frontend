import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    if (error) {
      toast.error("❌ Google authentication failed. Please try again.");
      navigate("/login");
      return;
    }

    if (accessToken && refreshToken) {
      // ✅ Store tokens
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // ✅ Decode token to get user info (optional)
      try {
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        const user = {
          _id: payload._id,
          email: payload.email,
          userName: payload.userName,
          fullName: payload.fullName,
        };
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.error("Error decoding token:", e);
      }

      // ✅ Trigger storage event
      window.dispatchEvent(new Event("storage-update"));
      
      toast.success("✅ Login successful!");
      navigate("/");
    } else {
      toast.error("❌ Authentication failed. Please try again.");
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-700">Completing sign in...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;