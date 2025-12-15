import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/util/Navbar';
import Footer from './components/util/Footer';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GTM_ID = 'GTM-53LB38K8';

const GTMPageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer.push({
      event: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <GTMPageTracker />
      <div className="flex flex-col min-h-screen bg-white">
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
