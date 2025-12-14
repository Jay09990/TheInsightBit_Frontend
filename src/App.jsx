import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/util/Navbar'
import Footer from './components/util/Footer'
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
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
}

export default App;
