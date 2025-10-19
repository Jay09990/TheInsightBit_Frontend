import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { X, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const predefinedCategories = [
  "Political",
  "Science & Tech",
  "Entertainment",
  "Sports",
  "Health",
  "Lifestyle",
];

const AdminPanel = () => {
  const [headline, setHeadline] = useState("");
  const [detail, setDetail] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postId, setPostId] = useState(null);
  const [existingMedia, setExistingMedia] = useState("");

  const fileRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // Use environment variable or fallback to production URL
    const API_BASE_URL = "https://theinsightbit-backend.onrender.com/api/v1";

  // ✅ FIXED: Load post data when editing
  useEffect(() => {
    if (location.state?.postData) {
      const post = location.state.postData;
      
      setIsEditing(true);
      setPostId(post._id);
      setHeadline(post.headline || "");
      setDetail(post.detail || "");
      setTags(post.tags || []);
      setCategories(post.categories || []);
      
      // Use mediaUrl if available, otherwise media
      setExistingMedia(post.mediaUrl || post.media || "");
      
      console.log("✅ Loaded post for editing:", post);
    }
  }, [location.state]);

  const addTag = () => {
    const v = tagInput.trim();
    if (!v) return;
    if (!tags.includes(v)) setTags((p) => [...p, v]);
    setTagInput("");
  };

  const removeTag = (t) => setTags((p) => p.filter((x) => x !== t));

  const addCategory = () => {
    const v = categoryInput.trim();
    if (!v) return;
    if (categories.includes(v)) {
      setCategoryInput("");
      return;
    }

    if (!predefinedCategories.includes(v)) {
      const ok = window.confirm(
        `"${v}" is a new category. Click OK to create and add it.`
      );
      if (!ok) return;
    }

    setCategories((p) => [...p, v]);
    setCategoryInput("");
  };

  const removeCategory = (c) => setCategories((p) => p.filter((x) => x !== c));

  // ✅ FIXED: Submit handler for both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized. Please log in as admin.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("headline", headline);
    formData.append("detail", detail);
    tags.forEach((t) => formData.append("tags[]", t));
    categories.forEach((c) => formData.append("categories[]", c));
    
    // Only append media if a new file is selected
    if (media) {
      formData.append("media", media);
    }

    try {
      let res;
      
      if (isEditing && postId) {
        // 📝 Update existing post
        console.log("🔄 Updating post with ID:", postId);
        console.log("🔄 API URL:", `${API_BASE_URL}/post/${postId}`);
        
        res = await axios.patch(`${API_BASE_URL}/post/${postId}`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
        alert("✅ Post updated successfully!");
      } else {
        // 🆕 Create new post
        console.log("🆕 Creating new post");
        console.log("🔄 API URL:", `${API_BASE_URL}/post/create`);
        
        res = await axios.post(`${API_BASE_URL}/post/create`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
        alert("✅ Post created successfully!");
      }

      console.log("✅ Server response:", res.data);

      // Reset form
      resetForm();
      
      // Navigate back to posts page
      navigate("/admin-posts");
      
    } catch (err) {
      console.error("❌ Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        url: err.config?.url
      });
      
      const errorMessage = err.response?.data?.message 
        || err.message 
        || "An error occurred";
      
      alert(`❌ Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper function to reset form
  const resetForm = () => {
    setHeadline("");
    setDetail("");
    setTags([]);
    setCategories([]);
    setTagInput("");
    setCategoryInput("");
    setMedia(null);
    setExistingMedia("");
    setIsEditing(false);
    setPostId(null);
    if (fileRef.current) fileRef.current.value = null;
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    resetForm();
    navigate("/admin-posts");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          {isEditing ? "✏️ Edit Post" : "➕ Create New Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Headline */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Enter headline"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Media */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Media (Photo or Video)
            </label>
            {existingMedia && !media && (
              <div className="mb-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Current Media:</p>
                {existingMedia.endsWith('.mp4') || existingMedia.endsWith('.webm') ? (
                  <video 
                    src={existingMedia} 
                    controls 
                    className="rounded-lg max-h-48 w-full object-cover"
                  />
                ) : (
                  <img
                    src={existingMedia}
                    alt="existing media"
                    className="rounded-lg max-h-48 w-full object-cover"
                  />
                )}
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none"
            />
            {media && (
              <p className="text-sm text-green-600 mt-1">
                ✓ New file selected: {media.name}
              </p>
            )}
          </div>

          {/* Details */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Details
            </label>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Write details here..."
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Tags (SEO)
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  } else if (e.key === "Backspace" && tagInput === "") {
                    setTags((p) => p.slice(0, -1));
                  }
                }}
                placeholder="Type tag and press Enter"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-purple-600 text-white px-3 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-purple-700"
              >
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                >
                  {t}
                  <button type="button" onClick={() => removeTag(t)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Categories
            </label>
            <div className="flex gap-2 mb-2">
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) return;
                  if (!categories.includes(val))
                    setCategories((p) => [...p, val]);
                  e.target.value = "";
                }}
                className="border border-gray-300 rounded-lg px-3 py-2"
                defaultValue=""
              >
                <option value="">Select category</option>
                {predefinedCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCategory();
                  }
                }}
                placeholder="Or type new category"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={addCategory}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-blue-700"
              >
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {c}
                  <button type="button" onClick={() => removeCategory(c)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "✓ Confirm Edit"
                : "➕ Create Post"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;