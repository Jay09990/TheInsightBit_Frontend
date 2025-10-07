import React from "react";
import BlogSlider from "../components/BlogPage//BlogSlider";
import { motion } from "framer-motion";

const Blog = () => {

    const relatedSlides = [
        {
            id: 1,
            title: "AI and the Future of Journalism",
            description: "How automation is shaping content creation.",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
        },
        {
            id: 2,
            title: "Ethics in AI Development",
            description: "Why responsible design matters more than ever.",
            image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80"
        }
    ];

    // Dummy data for now — later this can come from backend using route params
    const blog = {
        title: "The Rise of AI in Modern Technology",
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        author: "Jay Dudhrejiya",
        date: "October 6, 2025",
        content: `
      lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut massa nec orci viverra facilisis ut a mauris. Integer fermentum, nunc vel tincidunt luctus, nunc urna aliquet nunc, euismod aliquam nisl nunc euismod nunc. Sed euismod, nunc vel tincidunt luctus, nunc urna aliquet nunc, euismod aliquam nisl nunc euismod nunc.
      \n\n
      Phasellus euismod, nunc vel tincidunt luctus, nunc urna aliquet nunc, euismod aliquam nisl nunc euismod nunc. Sed euismod, nunc vel tincidunt luctus, nunc urna aliquet nunc, euismod aliquam nisl nunc euismod nunc.
      \n\n
      Donec vel mauris quam. Sed euismod, nunc vel tincidunt luctus, nunc urna aliquet nunc, euismod aliquam nisl nunc euismod nunc. Sed euismod, nunc vel tincidunt luctus, nunc urna aliquet nunc, euismod aliquam nisl nunc euismod nunc.
      \n\n
      Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla quis lorem ut libero malesuada feugiat.
      \n\n
      Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu    e, accumsan id imperdiet et, porttitor at sem. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
    `,
    };

    return (
        <div className="bg-[#373A3B] text-white min-h-[calc(100vh-80px)] px-6 py-12 flex flex-col items-center">
            {/* Blog Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl w-full text-center mb-10"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">
                    {blog.title}
                </h1>
                <p className="text-gray-300 text-sm">
                    By <span className="text-blue-400">{blog.author}</span> • {blog.date}
                </p>
            </motion.div>

            {/* Blog Image */}
            <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={blog.image}
                alt={blog.title}
                className="w-full max-w-4xl rounded-2xl shadow-lg mb-10 object-cover"
            />

            {/* Blog Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="max-w-4xl text-gray-200 leading-relaxed text-lg"
            >
                {blog.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-6">
                        {paragraph.trim()}
                    </p>
                ))}
            </motion.div>

            <BlogSlider slides={relatedSlides} />
        </div>
    );
};

export default Blog;
