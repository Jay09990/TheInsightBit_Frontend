import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import dayjs from "dayjs"; // optional: for formatting date

const HeadlineCardsList = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          `https://theinsightbit-backend.onrender.com/post/headlines`
        );
        setBlogData(response.data.data); // assuming ApiResponse structure
      } catch (err) {
        console.error(err);
        setError("Failed to fetch headlines");
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  // Extract unique categories
  const categories = ["All", ...new Set(blogData.map((b) => b.category))];

  // Filtered blogs
  const filteredBlogs =
    activeCategory === "All"
      ? blogData
      : blogData.filter((b) => b.category === activeCategory);

  if (loading) return <p className="text-center mt-8">Loading headlines...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Headlines Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Headlines :
          </h2>

          {/* Category Filter Bar */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <Link key={blog._id} to={`/blog/${blog._id}`} className="block">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer">
                  <div className="flex">
                    {/* Image Container */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0">
                      <img
                        src={blog.mediaUrl} // mediaUrl from backend
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 p-4 flex flex-col justify-center">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-2">
                        {blog.headline}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {blog.category} &bull;{" "}
                        {dayjs(blog.createdAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadlineCardsList;
