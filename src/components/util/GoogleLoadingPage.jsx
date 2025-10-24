import React, { useEffect } from "react";

const GoogleLoadingPage = () => {
  useEffect(() => {
    // Redirect after short delay
    const timer = setTimeout(() => {
      window.location.href = "https://theinsightbit-backend.onrender.com/api/v1/auth/google";
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md w-full">
        <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-6"></div>
        <h1 className="text-2xl font-bold mb-3">Redirecting to Google...</h1>
        <p className="text-gray-600">
          Please wait while we securely connect to your Google account.
        </p>
      </div>
    </div>
  );
};

export default GoogleLoadingPage;
