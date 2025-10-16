import React, { useState, useRef } from "react";
import axios from "axios";
import { X, Plus } from "lucide-react";

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

  const fileRef = useRef(); // 👈 to fully reset file input

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://theinsightbit-backend.onrender.com/api/v1";
  const localLink = "http://localhost:8000/api/v1";

  // ---------------------
  // Helpers
  // ---------------------

  const addTag = () => {
    const v = tagInput.trim();
    if (!v) return;
    if (!tags.includes(v)) setTags((p) => [...p, v]);
    setTagInput("");
  };

  const removeTag = (t) => {
    setTags((p) => p.filter((x) => x !== t));
  };

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

  const removeCategory = (c) => {
    setCategories((p) => p.filter((x) => x !== c));
  };

  // ---------------------
  // Submit handler (fixed)
  // ---------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Create *new* FormData fresh every time
    const formData = new FormData();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized. Please log in as admin.");

      if (!headline.trim() || !detail.trim())
        throw new Error("Headline and detail are required.");

      formData.append("headline", headline);
      formData.append("detail", detail);

      // ✅ Append tags as array
      if (tags.length) tags.forEach((t) => formData.append("tags[]", t));

      // ✅ Append categories as array
      if (categories.length)
        categories.forEach((c) => formData.append("categories[]", c));

      if (media) formData.append("media", media);

      const res = await axios.post(`${API_BASE_URL}/post/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Post Response:", res.data);

      alert("✅ Post created successfully!");

      // ✅ Fully clear form
      setHeadline("");
      setDetail("");
      setTags([]);
      setCategories([]);
      setTagInput("");
      setCategoryInput("");
      setMedia(null);

      // ✅ Reset file input DOM value (avoids reusing previous file object)
      if (fileRef.current) fileRef.current.value = null;

      // ✅ Force unique key rerender to reset internal FormData reference
      e.target.reset?.();
    } catch (err) {
      console.error("❌ Create post error:", err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------
  // JSX
  // ---------------------

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
              ref={fileRef}
              id="mediaInput"
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
                placeholder="Type tag and press Enter or click Add"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-purple-600 text-white px-3 py-2 rounded-lg inline-flex items-center gap-2"
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
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="p-1"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Categories (user-facing)
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
                placeholder="Or type new category and click Add"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />

              <button
                type="button"
                onClick={addCategory}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg inline-flex items-center gap-2"
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
                  <button
                    type="button"
                    onClick={() => removeCategory(c)}
                    className="p-1"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
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
