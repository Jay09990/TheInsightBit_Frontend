import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogSlider from "../components/BlogPage/BlogSlider";
import { motion } from "framer-motion";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://theinsightbit-backend.onrender.com/api/v1/post/all"
        );
        // Assuming response.data.data contains the array of posts
        setPosts(response?.data?.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts from backend");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-white mt-20">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-20">{error}</p>;
  }

  // For demo, show the first post as main blog and rest as related slides
  const mainPost = posts[0] || {};
  const relatedSlides = posts.slice(1).map((post) => ({
    id: post._id,
    title: post.headline,
    description: post.detail.slice(0, 80) + "...",
    image: post.mediaUrl,
  }));

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
          {mainPost.headline || "No Post Available"}
        </h1>
        <p className="text-gray-300 text-sm">
          By{" "}
          <span className="text-blue-400">
            {mainPost.author?.userName || "Unknown"}
          </span>{" "}
          • {new Date(mainPost.createdAt).toLocaleDateString() || "N/A"}
        </p>
      </motion.div>

      {/* Blog Image */}
      {mainPost.mediaUrl && (
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={mainPost.mediaUrl}
          alt={mainPost.headline}
          className="w-full max-w-4xl rounded-2xl shadow-lg mb-10 object-cover"
        />
      )}

      {/* Blog Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-4xl text-gray-200 leading-relaxed text-lg"
      >
        {mainPost.detail?.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-6">
            {paragraph.trim()}
          </p>
        ))}
      </motion.div>

      {/* Related Slides */}
      <BlogSlider slides={relatedSlides} />
    </div>
  );
};

export default Blog;
