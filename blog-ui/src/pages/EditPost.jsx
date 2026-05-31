import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditPost = () => {
  const navigate = useNavigate();

  const { blogId } = useParams();

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    blogId: "",
    title: "",
    content: "",
    tags: "",
    readMoreLink: "",
    likes: 0,
    isApproved: false,
    isFeatured: false,
    createdAt: "",
    updatedAt: "",
    userId: null,
  });

  useEffect(() => {
    loadBlog();
  }, []);

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

  const loadBlog = async () => {
    try {
      const response = await api.get(`/blog/${blogId}`);

      setFormData(response.data.data);
    } catch (error) {
      console.error(error);

      showToast("error", "Failed To Load Blog");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/blog/update-blog-post", formData);

      if (response.data.status === "SUCCESS") {
        showToast("success", "Post Updated Successfully");

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
    } catch (error) {
      console.error(error);

      showToast(
        "error",
        error.response?.data?.message || "Failed To Update Post",
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e7e7e7]">
      <div className="w-[98%] mx-auto">
        {/* HEADER */}

        <div className="bg-[#2f2f2f] text-white">
          <h1 className="text-center text-3xl font-bold py-4">
            Blog Dashboard
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="
              block
              w-full
              bg-[#666666]
              py-2
              border
              border-gray-500
            "
          >
            Home
          </button>

          <button
            onClick={() => navigate("/create-post")}
            className="
              block
              w-full
              bg-[#555555]
              py-2
              border
              border-gray-500
            "
          >
            Create New Post
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="
              block
              w-full
              bg-[#777777]
              py-2
              border
              border-gray-500
            "
          >
            Profile
          </button>
        </div>

        {/* CONTENT */}

        <div className="bg-white p-4">
          {toast.show && (
            <div
              className={`
                mb-4
                p-3
                rounded
                text-center
                text-white
                font-semibold
                ${toast.type === "success" ? "bg-green-700" : "bg-red-700"}
              `}
            >
              {toast.message}
            </div>
          )}

          <div className="border bg-[#f4f4f4] p-5">
            <h2 className="text-3xl font-bold mb-6">Edit Post</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Blog Id</label>

                <input
                  disabled
                  value={formData.blogId}
                  className="
                    w-full
                    border
                    p-2
                    bg-gray-200
                  "
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Title</label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    p-2
                  "
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Content</label>

                <textarea
                  rows="8"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    p-2
                  "
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">Tags</label>

                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    p-2
                  "
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Read More Link
                </label>

                <input
                  type="text"
                  name="readMoreLink"
                  value={formData.readMoreLink}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    p-2
                  "
                />
              </div>
              <div
                className="
    mt-6
    mb-6
    bg-[#e5e5e5]
    border
    rounded
    p-4
  "
              >
                <div
                  className="
      grid
      grid-cols-3
      gap-4
      text-center
    "
                >
                  {/* Approved */}

                  <div>
                    <div className="text-3xl">
                      {formData.isApproved ? "✅" : "❌"}
                    </div>

                    <div className="font-bold">
                      {formData.isApproved ? "Approved" : "Not Approved"}
                    </div>
                  </div>

                  {/* Featured */}

                  <div>
                    <div className="text-3xl">
                      {formData.isFeatured ? "⭐" : "❌"}
                    </div>

                    <div className="font-bold">
                      {formData.isFeatured ? "Featured" : "Not Featured"}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="
                  w-full
                  bg-[#2f2f2f]
                  text-white
                  py-3
                  font-semibold
                  mt-3
                "
              >
                Update Post
              </button>
            </form>
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            bg-[#2f2f2f]
            text-white
            text-center
            py-8
            font-semibold
          "
        >
          © 2024 Blog Platform
        </div>
      </div>
    </div>
  );
};

export default EditPost;
