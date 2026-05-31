import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    readMoreLink: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/blog/post-blog", formData);

      if (response.data.status === "SUCCESS") {
        showToast("success", "Blog Published Successfully");

        setFormData({
          title: "",
          content: "",
          tags: "",
          readMoreLink: "",
        });
      }
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Failed To Publish Blog",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e7e7e7]">
      {/* Header */}

      <div className="w-full px-2">
        <div className="bg-[#2f2f2f] text-white">
          <h1 className="text-center text-3xl font-bold py-4">
            Blog Dashboard
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="block w-full bg-[#6a6a6a] py-2 border border-gray-500"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/create-post")}
            className="block w-full bg-[#777777] py-2 border border-gray-500"
          >
            Create New Post
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="block w-full bg-[#6a6a6a] py-2 border border-gray-500"
          >
            Profile
          </button>
        </div>

        {/* Body */}

        <div className="bg-white p-4">
          {/* Toast */}

          {toast.show && (
            <div
              className={`
                                mb-4
                                p-3
                                text-center
                                text-white
                                font-semibold
                                rounded
                                ${
                                  toast.type === "success"
                                    ? "bg-green-700"
                                    : "bg-red-700"
                                }
                            `}
            >
              {toast.message}
            </div>
          )}

          <div className="border bg-[#f3f3f3] p-5">
            <h2 className="text-3xl font-bold mb-6">Create New Post</h2>

            <form onSubmit={handleSubmit}>
              {/* Title */}

              <div className="mb-5">
                <label className="block font-semibold mb-2">Title:</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="
                                        w-full
                                        border
                                        p-2
                                        bg-white
                                    "
                />
              </div>

              {/* Content */}

              <div className="mb-5">
                <label className="block font-semibold mb-2">Content:</label>

                <textarea
                  rows="5"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  className="
                                        w-full
                                        border
                                        p-2
                                        bg-white
                                    "
                />
              </div>

              {/* Tags */}

              <div className="mb-5">
                <label className="block font-semibold mb-2">Tags:</label>

                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Comma separated tags"
                  className="
                                        w-full
                                        border
                                        p-2
                                        bg-white
                                    "
                />
              </div>

              {/* Read More Link */}

              <div className="mb-5">
                <label className="block font-semibold mb-2">
                  Read More Link:
                </label>

                <input
                  type="url"
                  name="readMoreLink"
                  value={formData.readMoreLink}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="
                                        w-full
                                        border
                                        p-2
                                        bg-white
                                    "
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                                    w-full
                                    bg-[#2f2f2f]
                                    text-white
                                    py-2
                                    font-semibold
                                    hover:bg-black
                                "
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}

        <div className="bg-[#2f2f2f] text-white text-center py-8 font-semibold">
          © 2024 Blog Platform
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
