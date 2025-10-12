import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [headline, setHeadline] = useState("");
  const [detail, setDetail] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://theinsightbit-backend.onrender.com/api/v1";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Unauthorized. Please log in as admin.");

      // Prepare form data for upload (handles images/videos)
      const formData = new FormData();
      formData.append("headline", headline);
      formData.append("detail", detail);
      formData.append("tags", tags);
      if (media) formData.append("media", media);

      const res = await axios.post(`${API_BASE_URL}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Post created successfully!");
      console.log("Post Response:", res.data);

      // Reset form
      setHeadline("");
      setDetail("");
      setTags("");
      setMedia(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Admin Post Creation Center
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
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none"
            />
            {media && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: <span className="font-medium">{media.name}</span>
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
            <label className="block text-gray-700 font-medium mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. health, psychology, habits"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all"
          >
            {loading ? "Posting..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
