import React, { useEffect, useState } from "react";
import axios from "axios";

const Comments = ({ postId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);

  const API_BASE_URL = "https://theinsightbit-backend.onrender.com"; // 🔹 change when deploying

  // ✅ Fetch all comments for this post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/comments/${postId}`);
        setComments(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (error) {
        // console.error("❌ Error fetching comments:", error);
        setComments([]);
      }
    };

    fetchComments();
  }, [postId]);

  // ✅ Add new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to comment.");
        return;
      }

      await axios.post(
        `${API_BASE_URL}/api/v1/comments/add`,
        { postId, content: newComment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewComment("");

      // Refresh comments
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/comments/${postId}`);
      setComments(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      // console.error("❌ Failed to post comment:", err);
    }
  };

  // ✅ Admin reply
  const handleReplySubmit = async (commentId) => {
    if (!replyText.trim()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in as admin to reply.");
        return;
      }

      await axios.post(
        `${API_BASE_URL}/api/v1/comments/reply`,
        { commentId, reply: replyText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReplyTarget(null);
      setReplyText("");

      // Refresh comments
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/comments/${postId}`);
      setComments(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      // console.error("❌ Failed to post reply:", err);
    }
  };

  return (
    <div className="mt-8 bg-[#2E3031] p-6 rounded-xl text-white">
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">Comments</h2>

      {/* Add comment form */}
      {user ? (
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full bg-[#3E4041] rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button
            type="submit"
            className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-gray-400 italic">Please log in to comment.</p>
      )}

      {/* Display comments */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400 italic">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="border border-gray-600 rounded-lg p-4"
            >
              <p className="font-semibold text-blue-300">
                {comment.user?.username || "Anonymous"}
              </p>
              <p className="text-gray-200 mt-1">{comment.content}</p>

              {/* Admin reply */}
              {comment.reply && (
                <div className="ml-4 mt-3 bg-gray-700 rounded-lg p-3 text-sm">
                  <strong className="text-green-400">Admin Reply:</strong>{" "}
                  {comment.reply}
                </div>
              )}

              {/* Reply form (admin only) */}
              {user?.role === "admin" && (
                <div className="mt-3 ml-4">
                  {replyTarget === comment._id ? (
                    <div>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full bg-[#3E4041] rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="2"
                      />
                      <button
                        onClick={() => handleReplySubmit(comment._id)}
                        className="mt-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-sm"
                      >
                        Submit Reply
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyTarget(comment._id)}
                      className="text-blue-400 text-sm hover:underline"
                    >
                      Reply
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
