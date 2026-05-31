import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function PostModeration() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const response = await api.get("/admin/get-all-posts");

      setPosts(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleApprove = async (blogId) => {
    try {
      await api.put("/admin/approve-post", {
        blogId,
        isApproved: true,
      });

      loadPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to approve post");
    }
  };

  const handleReject = async (blogId) => {
    try {
      await api.put("/admin/approve-post", {
        blogId,
        isApproved: false,
      });

      loadPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to reject post");
    }
  };

  const handleRemove = async (blogId) => {
    try {
      await api.delete(`/admin/delete-blog/${blogId}`);

      loadPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="bg-[#e9e9e9] min-h-screen">
      <div className="w-[96%] mx-auto pt-6">
        {/* Header */}

        <div className="bg-[#333333] text-white text-center py-4">
          <h1 className="text-2xl font-bold">Admin Blog Dashboard</h1>
        </div>

        {/* Menu */}

        <div className="bg-[#4b4b4b] py-4">
          <div className="w-[98%] mx-auto">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-[#5a5a5a] text-white py-2"
            >
              Manage Posts
            </button>

            <button
              onClick={() => navigate("/users")}
              className="w-full bg-[#5a5a5a] text-white py-2"
            >
              Manage Users
            </button>

            {/* ACTIVE BUTTON */}

            <button
              onClick={() => navigate("/moderation")}
              className="w-full bg-[#777777] text-white py-2 border border-[#666]"
            >
              Post Moderation
            </button>

            <button
              onClick={() => navigate("/reports")}
              className="w-full bg-[#5a5a5a] text-white py-2"
            >
              Reports
            </button>
          </div>
        </div>

        {/* Content */}

        <div className="bg-white mt-4 border border-gray-300 p-6 shadow-sm">
          <h2 className="text-3xl font-semibold mb-8">Post Moderation</h2>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-[#333333] text-white">
                  <th className="text-left p-3 w-[15%]">Title</th>

                  <th className="text-left p-3 w-[25%]">Author</th>

                  <th className="text-left p-3 w-[10%]">Date</th>

                  <th className="text-left p-3 w-[10%]">Status</th>

                  <th className="text-left p-3 w-[20%]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => (
                  <tr key={post.blogId} className="border-b">
                    <td className="py-10 px-2">{post.title}</td>

                    <td className="py-10 px-2">{post.authorName}</td>

                    <td className="py-10 px-2">{formatDate(post.createdAt)}</td>

                    <td className="py-10 px-2">
                      {post.isApproved === null && (
                        <span className="font-semibold">Pending Approval</span>
                      )}

                      {post.isApproved === true && (
                        <span className="font-semibold">Approved</span>
                      )}

                      {post.isApproved === false && (
                        <span className="font-semibold">Rejected</span>
                      )}
                    </td>

                    <td className="py-4 px-2">
                      <div className="flex flex-col gap-2 w-[360px]">
                        <button
                          onClick={() => handleApprove(post.blogId)}
                          className="bg-[#333333] text-white py-2"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleReject(post.blogId)}
                          className="bg-[#333333] text-white py-2"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => handleRemove(post.blogId)}
                          className="bg-[#333333] text-white py-2"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <hr className="mt-6" />
        </div>

        {/* Footer */}

        <div className="bg-[#333333] text-white text-center py-5 mt-8">
          © 2026 Blog Platform
        </div>
      </div>
    </div>
  );
}
