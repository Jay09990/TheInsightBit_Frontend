import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Home_page from './pages/Home_page'
import Navbar from './components/util/Navbar'
import Footer from './components/util/Footer'
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
