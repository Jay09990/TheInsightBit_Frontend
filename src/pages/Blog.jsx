import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogSlider from "../components/BlogPage/BlogSlider";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Comments from "../components/util/Comments.jsx";

const Blog = ({ user }) => {
  const { id } = useParams(); // 👈 get post ID from URL
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_RENDER;
    const API_BASE_URL_LOCAL = import.meta.env.VITE_API_BASE_URL_LOCAL;
    const fetchPost = async () => {
      try {
        // Fetch the specific post
        const postRes = await axios.get(`${API_BASE_URL}/post/${id}`);
        // Fetch all posts to show related
        const allRes = await axios.get(`${API_BASE_URL}/post/all?limit=5`);

        setPost(postRes.data.data);
        setRelatedPosts(allRes.data.data.filter((p) => p._id !== id));
        setLoading(false);
      } catch (err) {
        // console.error(err);
        setError("Failed to fetch post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return <p className="text-center text-white mt-20">Loading post...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;
  if (!post)
    return <p className="text-center text-gray-400 mt-20">Post not found</p>;

  const relatedSlides = relatedPosts.map((p) => ({
    id: p._id,
    title: p.headline,
    description: p.detail.slice(0, 80) + "...",
    image: p.mediaUrl,
    detail: p.detail,
    tags: p.tags || [],
  }));

  return (
    <div className="bg-[#373A3B] text-white min-h-[calc(100vh-80px)] px-6 py-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">
          {post.headline}
        </h1>
        <p className="text-gray-300 text-sm">
          By{" "}
          <span className="text-blue-400">
            {post.author?.userName || "Unknown"}
          </span>{" "}
          • {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </motion.div>

      {post.mediaUrl && (
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={post.mediaUrl}
          alt={post.headline}
          className="w-full max-w-4xl rounded-2xl shadow-lg mb-10 object-cover"
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-4xl w-full text-gray-200 leading-relaxed post-content"
        dangerouslySetInnerHTML={{ __html: post.detail || "" }}
      />

      <BlogSlider slides={relatedSlides} />

      <Comments postId={post._id} user={user} />
    </div>
  );
};

export default Blog;
