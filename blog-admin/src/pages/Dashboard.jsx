import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadPosts = async () => {
    try {
      const response = await api.get("/admin/get-all-posts");

      setPosts(response.data.data || []);
    } catch (error) {
      console.error("Failed to load posts", error);
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

  const handleEdit = (blogId) => {
    navigate(`/edit-post/${blogId}`);
  };

  const handleDelete = async (blogId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?",
      );

      if (!confirmDelete) return;

      await api.delete(`/admin/delete-blog/${blogId}`);

      alert("Post deleted successfully");

      loadPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete post");
    }
  };

  const handleFeature = async (blogId) => {
    try {
      await api.put(`/admin/feature/${blogId}`);

      loadPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to feature post");
    }
  };

  return (
    <div className="bg-[#e9e9e9] min-h-screen">
      <div className="w-[92%] mx-auto pt-6">
        {/* Header */}
        <div className="bg-[#333333] text-white text-center py-4">
          <h1 className="text-2xl font-bold">Admin Blog Dashboard</h1>
        </div>

        {/* Menu */}
        <div className="bg-[#4b4b4b] py-4">
          <div className="w-[98%] mx-auto">
            <button className="w-full bg-[#777777] text-white py-2 border border-[#666]">
              Manage Posts
            </button>

            <button
              onClick={() => navigate("/users")}
              className="w-full bg-[#5a5a5a] text-white py-2"
            >
              Manage Users
            </button>

            <button
              onClick={() => navigate("/moderation")}
              className="w-full bg-[#5a5a5a] text-white py-2"
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
          <h2 className="text-3xl font-semibold mb-6">Manage Blog Posts</h2>

          {loading ? (
            <div className="text-center py-10">Loading Posts...</div>
          ) : (
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-[#333333] text-white">
                  <th className="text-left p-3 w-[25%]">Title</th>

                  <th className="text-left p-3 w-[20%]">Author</th>

                  <th className="text-left p-3 w-[15%]">Date</th>

                  <th className="text-left p-3 w-[15%]">Status</th>

                  <th className="text-left p-3 w-[10%]">Featured</th>

                  <th className="text-left p-3 w-[25%]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => (
                  <tr key={post.blogId} className="border-b">
                    <td className="py-4 px-3">{post.title}</td>

                    <td className="py-4 px-3">{post.authorName}</td>

                    <td className="py-4 px-3">{formatDate(post.createdAt)}</td>

                    <td className="py-4 px-3">
                      {post.isApproved ? "Approved" : "Published"}
                    </td>

                    <td className="py-4 px-3 text-center">
                      {post.isFeatured ? "YES" : "NO"}
                    </td>

                    <td className="py-4 px-3">
                      <div className="flex flex-col gap-2 w-[220px]">
                        <button
                          onClick={() => handleEdit(post.blogId)}
                          className="bg-[#333333] text-white py-2"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(post.blogId)}
                          className="bg-[#333333] text-white py-2"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => handleFeature(post.blogId)}
                          className="bg-[#333333] text-white py-2"
                        >
                          Feature
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
