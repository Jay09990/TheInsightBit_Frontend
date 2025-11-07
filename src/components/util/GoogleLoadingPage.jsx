import React, { useEffect, useState } from "react";
import axios from "axios";

const GoogleLoadingPage = () => {
  const [message, setMessage] = useState("Preparing authentication...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_RENDER;
    const API_BASE_URL_LOCAL = import.meta.env.VITE_API_BASE_URL_LOCAL;
    
    // Simulate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 2, 95));
    }, 200);

    const wakeUpBackend = async () => {
      try {
        setMessage("Waking up server...");
        
        // NOTE: This value is also stored in .env as VITE_BACKEND_HEALTH_URL; it's safe to remove this hard-coded value and use import.meta.env.VITE_BACKEND_HEALTH_URL
        const response = await axios.get(
          `${API_BASE_URL}/health`,
          { timeout: 30000 }
        );

        const elapsed = Date.now() - startTime;
        console.log(`Backend woke up in ${elapsed}ms`);

        setProgress(100);
        setMessage("Connected! Redirecting to Google...");
        
        setTimeout(() => {
          // NOTE: This value is also stored in .env as VITE_GOOGLE_AUTH_URL; it's safe to remove this hard-coded value and use import.meta.env.VITE_GOOGLE_AUTH_URL
          window.location.href = `${API_BASE_URL}/auth/google`;
        }, 500);

      } catch (error) {
        console.error("Backend error:", error);
        
        // Check if it's a timeout
        if (error.code === 'ECONNABORTED') {
          setMessage("Server is starting up, redirecting anyway...");
        } else {
          setMessage("Connecting to Google...");
        }
        
        setTimeout(() => {
          // NOTE: This value is also stored in .env as VITE_GOOGLE_AUTH_URL; it's safe to remove this hard-coded value and use import.meta.env.VITE_GOOGLE_AUTH_URL
          window.location.href = `${API_BASE_URL}/auth/google`;
        }, 1500);
      }
    };

    wakeUpBackend();

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full">
        {/* Google Logo */}
        <img 
          src="https://www.svgrepo.com/show/355037/google.svg" 
          alt="Google" 
          className="w-16 h-16 mx-auto mb-6"
        />

        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <h1 className="text-2xl font-bold mb-3 text-gray-900">
          {message}
        </h1>
        
        <p className="text-gray-600 mb-6">
          Setting up secure connection...
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-purple-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          First visit may take 10-20 seconds
        </p>
      </div>
    </div>
  );
};

export default GoogleLoadingPage;