import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const userStr = searchParams.get('user');

    if (accessToken && refreshToken && userStr) {
      try {
        const decodedUserStr = decodeURIComponent(userStr);
        const user = JSON.parse(decodedUserStr);

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Trigger navbar update
        window.dispatchEvent(new Event('storage-update'));

        toast.success(`✅ Welcome, ${user.fullName || user.userName}!`);

        // Redirect by role
        setTimeout(() => {
          navigate(user.role === 'admin' ? '/admin-panel' : '/');
        }, 500);
      } catch (error) {
        console.error('OAuth parsing error:', error);
        toast.error('Login failed. Please try again.');
        navigate('/login');
      }
    } else {
      toast.error('Authentication failed');
      navigate('/login');
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-700">Completing sign in...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
