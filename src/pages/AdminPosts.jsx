import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MoreVertical, Eye } from "lucide-react";
import { motion } from "framer-motion";

const AdminPosts = () => {
    const [posts, setPosts] = useState([]);
    const [menuOpen, setMenuOpen] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://theinsightbit-backend.onrender.com/api/v1";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/post/all`, {
                    withCredentials: true,
                });
                const user = JSON.parse(localStorage.getItem("user"));
                const adminPosts = data.data.filter(
                    (post) => post.author?._id === user?._id
                );
                setPosts(adminPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            await axios.delete(`${API_BASE_URL}/post/${deleteTarget}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setPosts(posts.filter((p) => p._id !== deleteTarget));
            setShowConfirm(false);
            setDeleteTarget(null);
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post: " + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (post) => {
        navigate("/admin-panel", { state: { postData: post } });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Manage Your Posts</h1>

            {posts.length === 0 ? (
                <p className="text-gray-500">No posts found. Create one to get started.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <motion.div
                            key={post._id}
                            whileHover={{ scale: 1.03 }}
                            className="relative rounded-2xl shadow-md overflow-hidden border border-gray-200 bg-white"
                        >
                            {/* ✅ Image with Link overlay */}
                            <Link to={`/blog/${post._id}`} className="block relative group">
                                <img
                                    src={post.mediaUrl || "/placeholder.png"}
                                    alt={post.headline}
                                    className="w-full h-48 object-cover"
                                />
                                {/* ✅ Preview overlay on hover */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-white flex items-center gap-2">
                                        <Eye size={20} />
                                        <span className="font-medium">Preview Post</span>
                                    </div>
                                </div>
                            </Link>

                            {/* ✅ Post info also clickable */}
                            <Link to={`/blog/${post._id}`} className="block p-4 hover:bg-gray-50 transition-colors">
                                <h3 className="text-lg font-semibold hover:text-blue-600 transition-colors">
                                    {post.headline}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-2">{post.detail}</p>
                            </Link>

                            {/* ✅ Action menu */}
                            <div className="absolute top-3 right-3">
                                <button
                                    onClick={() =>
                                        setMenuOpen(menuOpen === post._id ? null : post._id)
                                    }
                                    className="p-1 rounded-full bg-white/90 hover:bg-white shadow-md"
                                >
                                    <MoreVertical size={20} />
                                </button>

                                {menuOpen === post._id && (
                                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-32 border border-gray-200 z-20">
                                        <Link
                                            to={`/blog/${post._id}`}
                                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                                            onClick={() => setMenuOpen(null)}
                                        >
                                            👁️ Preview
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleEdit(post);
                                                setMenuOpen(null);
                                            }}
                                            className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowConfirm(true);
                                                setDeleteTarget(post._id);
                                                setMenuOpen(null);
                                            }}
                                            className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-red-600"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg shadow-lg p-6 text-center max-w-sm"
                    >
                        <h3 className="text-lg font-semibold mb-3">Delete Post?</h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete this post? This action cannot be undone.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminPosts;