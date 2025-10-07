import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, Cpu, Film, Trophy } from "lucide-react";

const categories = [
  {
    name: "Political",
    icon: <Globe className="w-10 h-10 text-yellow-400" />,
    color: "from-yellow-500 to-orange-500",
    path: "/category/political",
    description: "Stay updated with the latest in global and national politics.",
  },
  {
    name: "Science & Tech",
    icon: <Cpu className="w-10 h-10 text-blue-400" />,
    color: "from-blue-500 to-indigo-500",
    path: "/category/science-tech",
    description: "Discover innovations, breakthroughs, and future technologies.",
  },
  {
    name: "Entertainment",
    icon: <Film className="w-10 h-10 text-pink-400" />,
    color: "from-pink-500 to-purple-500",
    path: "/category/entertainment",
    description: "Movies, music, shows, and everything pop culture.",
  },
  {
    name: "Sports",
    icon: <Trophy className="w-10 h-10 text-green-400" />,
    color: "from-green-500 to-emerald-500",
    path: "/category/sports",
    description: "Latest scores, player news, and sports highlights.",
  },
];

const Category = () => {
  return (
    <div className="bg-[#373A3B] text-white flex flex-col items-center px-6 py-12 min-h-[calc(100vh-80px)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-3">
          Explore Categories
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Dive into your favorite topics — from politics to science, and sports to entertainment.
        </p>
      </motion.div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Link
              to={cat.path}
              className={`group bg-gradient-to-br ${cat.color} rounded-2xl p-[2px] hover:scale-105 transition-transform duration-300 block`}
            >
              <div className="bg-[#2E3031] rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
                <div className="mb-4">{cat.icon}</div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-300 text-sm">{cat.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Category;
