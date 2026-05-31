import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    loadProfile();
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

  const loadProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get("/user/get-user-profile");

      setProfile(response.data.data);
    } catch (error) {
      console.error(error);

      showToast("error", "Failed To Load Profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blogId) => {
    navigate(`/edit-post/${blogId}`);
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await api.delete(`/blog/${blogId}`);

      if (response.data.status === "SUCCESS") {
        showToast("success", "Post Deleted Successfully");

        await loadProfile();
      }
    } catch (error) {
      console.error(error);

      showToast("error", error.response?.data?.message || "Delete Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
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
              bg-[#555555]
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
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>

            <p>
              <strong>Name:</strong> {profile?.fullName}
            </p>

            <p className="mb-5">
              <strong>Email:</strong> {profile?.email}
            </p>

            <h3 className="text-xl font-bold mb-4">Your Posts</h3>

            {profile?.posts?.length === 0 && (
              <div className="bg-white border p-4">No Posts Found</div>
            )}

            {profile?.posts?.map((post) => (
              <div
                key={post.blogId}
                className="
                    bg-[#e5e5e5]
                    p-4
                    mb-4
                  "
              >
                <h4 className="font-bold mb-4">{post.title}</h4>

                <button
                  onClick={() => handleEdit(post.blogId)}
                  className="
                      w-full
                      bg-[#7b7b7b]
                      text-white
                      py-2
                      mb-2
                    "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(post.blogId)}
                  className="
                      w-full
                      bg-[#7b7b7b]
                      text-white
                      py-2
                    "
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              onClick={logout}
              className="
                w-full
                bg-[#2f2f2f]
                text-white
                py-3
                mt-4
                font-semibold
              "
            >
              Logout
            </button>
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

export default Profile;
