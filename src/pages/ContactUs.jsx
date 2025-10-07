import React from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <div className="bg-[#373A3B] text-white flex flex-col items-center justify-start px-6 py-12 min-h-screen">

      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-blue-400">
          Contact Us
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Have any questions or collaboration ideas?  
          We'd love to hear from you — drop a message below!
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#2E3031] p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-lg bg-[#3E4041] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-[#3E4041] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            placeholder="Write your message..."
            className="w-full px-4 py-3 rounded-lg bg-[#3E4041] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition-colors py-3 rounded-lg font-semibold text-white text-lg"
        >
          Send Message
        </button>
      </motion.form>      
    </div>
  );
};

export default ContactUs;
