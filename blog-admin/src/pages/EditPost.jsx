import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";

export default function EditPost() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    blogId: null,
    userId: null,
    title: "",
    content: "",
    tags: "",
    isApproved: false,
    isFeatured: false,
  });

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const response = await api.get(`/admin/get-post-by-id/${blogId}`);

      const post = response.data.data;

      setFormData({
        blogId: post.blogId,
        userId: post.userId,
        title: post.title || "",
        content: post.content || "",
        tags: post.tags || "",
        isApproved: post.isApproved ?? false,
        isFeatured: post.isFeatured ?? false,
      });
    } catch (error) {
      console.error(error);

      showToast("Failed to load post", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await api.put("/admin/update-blog-post", {
        blogId: formData.blogId,
        userId: formData.userId,
        title: formData.title,
        content: formData.content,
        tags: formData.tags,
        isApproved: formData.isApproved,
        isFeatured: formData.isFeatured,
      });

      showToast("Post updated successfully", "success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);

      showToast("Failed to update post", "error");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#e9e9e9] min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Loading Post...</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#e9e9e9] min-h-screen">
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 min-w-[300px]
          px-5 py-4 rounded-md shadow-xl text-white
          font-medium border-l-4
          ${
            toast.type === "success"
              ? "bg-green-600 border-green-800"
              : "bg-red-600 border-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-[92%] mx-auto pt-6">
        {/* Header */}

        <div className="bg-[#333333] text-white text-center py-4">
          <h1 className="text-2xl font-bold">Admin Blog Dashboard</h1>
        </div>

        {/* Menu */}

        <div className="bg-[#4b4b4b] py-4">
          <div className="w-[98%] mx-auto">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-[#777777] text-white py-2 border border-[#666]"
            >
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

        <div className="bg-white mt-4 border border-gray-300 p-6">
          <h2 className="text-3xl font-semibold mb-6">Edit Blog Post</h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold">Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-3"
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Content</label>

              <textarea
                rows="5"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full border p-3"
                placeholder="Enter content"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Tags</label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border p-3"
                placeholder="#springboot #java"
              />
            </div>

            <div className="flex gap-10">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isApproved}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isApproved: e.target.checked,
                    })
                  }
                />
                Approved
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isFeatured: e.target.checked,
                    })
                  }
                />
                Featured
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleUpdate}
                className="bg-[#333333] text-white px-8 py-3"
              >
                Update Post
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="bg-gray-600 text-white px-8 py-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="bg-[#333333] text-white text-center py-5 mt-8">
          © 2026 Blog Platform
        </div>
      </div>
    </div>
  );
}
