import React from 'react';
import { Link } from "react-router-dom";


const HeadlineCardsList = () => {
  const blogData = [
    {
      id: 1,
      title: "AI Tools & Applications In Daily Life",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
      category: "Technology"
    },
    {
      id: 2,
      title: "Health, Wellness & Mental Fitness",
      thumbnail: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
      category: "Health"
    },
    {
      id: 3,
      title: "Budgets, Saving Hacks, Investing Basics For Beginners",
      thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      category: "Finance"
    },
    {
      id: 4,
      title: "Finance, Side Hustles & Passive Income",
      thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
      category: "Finance"
    },
    {
      id: 5,
      title: "Finance, Side Hustles & Passive Income",
      thumbnail: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=400",
      category: "Finance"
    },
    {
      id: 6,
      title: "Investments And Savings",
      thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400",
      category: "Finance"
    },
    {
      id: 7,
      title: "Travel & Adventure On A Budget",
      thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
      category: "Travel"
    },
    {
      id: 8,
      title: "Practical Low-Waste Living Tip & Green Living",
      thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
      category: "Lifestyle"
    },
    {
      id: 9,
      title: "Lifestyle & Home",
      thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400",
      category: "Lifestyle"
    },
    {
      id: 10,
      title: "Education & Career Growth",
      thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400",
      category: "Education"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Headlines Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Headlines :
          </h2>

          {/* Cards Grid */}
          <div className="space-y-4">
            {blogData.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="block" // ensures the link covers the whole card
              >
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer">
                  <div className="flex">
                    {/* Image Container */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0">
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 p-4 flex items-center">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-2">
                        {blog.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Follow Us Section */}

      </div>
    </div>
  );
};

export default HeadlineCardsList;