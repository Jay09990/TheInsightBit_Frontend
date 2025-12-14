// ✅ HeadlineCardsList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const HeadlineCardsList = ({ headlines }) => {
  const [visibleBlogs, setVisibleBlogs] = useState([]); // For pagination
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(15); // Initially show 15 posts

  useEffect(() => {
    setVisibleBlogs(headlines.slice(0, 15));
  }, [headlines]);

  // ✅ Predefined + dynamic categories
  const predefinedCategories = [
    "Current updates",
    "India",
    "World",
    "Politics",
    "Sports",
    "Bussiness",
    "Finance",
    "Science"
  ];
  const dynamicCategories = [
    ...new Set(headlines.flatMap((b) => b.categories || [])),
  ].filter((cat) => cat && !predefinedCategories.includes(cat));

  const categories = ["All", ...predefinedCategories, ...dynamicCategories];

  // ✅ Filter logic
  const filteredBlogs =
    activeCategory === "All"
      ? headlines
      : headlines.filter((b) => (b.categories || []).includes(activeCategory));

  // ✅ Update visible blogs based on filter
  useEffect(() => {
    setVisibleCount(15);
    setVisibleBlogs(filteredBlogs.slice(0, 15));
  }, [activeCategory, headlines]);

  // ✅ Handle Load More
  const handleLoadMore = () => {
    const newCount = visibleCount + 5;
    setVisibleCount(newCount);
    setVisibleBlogs(filteredBlogs.slice(0, newCount));
  };

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
            {visibleBlogs.map((blog) => (
              <Link key={blog._id} to={`/blog/${blog._id}`} className="block">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer">
                  <div className="flex">
                    {/* Image Container */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0">
                      <img
                        src={blog.mediaUrl}
                        alt={blog.headline}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 p-4 flex flex-col justify-center">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-2">
                        {blog.headline}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {(blog.categories || []).join(", ") || "Uncategorized"}{" "}
                        &bull; {dayjs(blog.createdAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredBlogs.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Load More
              </button>
            </div>
          )}

          {/* End Message */}
          {visibleCount >= filteredBlogs.length && filteredBlogs.length > 0 && (
            <p className="text-center text-gray-500 mt-6">
              You’ve reached the end of headlines 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadlineCardsList;
