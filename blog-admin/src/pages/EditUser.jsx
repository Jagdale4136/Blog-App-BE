import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";

export default function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    createdAt: "",
    userId: "",
    fullName: "",
    email: "",
    userName: "",
    userRole: "USER",
    isActive: true,
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
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await api.get(`/admin/get-user-by-id/${userId}`);

      const user = response.data.data;

      setFormData({
        createdAt: user.createdAt,
        userId: user.userId,
        fullName: user.fullName || "",
        email: user.email || "",
        userName: user.userName || "",
        userRole: user.userRole || "USER",
        isActive: user.isActive,
      });
    } catch (error) {
      console.error(error);
      showToast("Failed to load user", "error");
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
      await api.put("/admin/update-user", {
        createdAt: formData.createdAt,
        email: formData.email,
        fullName: formData.fullName,
        isActive: formData.isActive,
        userId: formData.userId,
        userName: formData.userName,
        userRole: formData.userRole,
      });

      showToast("User updated successfully", "success");

      setTimeout(() => {
        navigate("/users");
      }, 1500);
    } catch (error) {
      console.error(error);

      showToast("Failed to update user", "error");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#e9e9e9] min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Loading User...</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#e9e9e9] min-h-screen">
      {/* Toast */}

      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-[9999]
          px-5 py-4 rounded-md shadow-xl text-white
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
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
              className="w-full bg-[#5a5a5a] text-white py-2"
            >
              Manage Posts
            </button>

            <button
              onClick={() => navigate("/users")}
              className="w-full bg-[#777777] text-white py-2 border border-[#666]"
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

        {/* Form */}

        <div className="bg-white mt-4 border border-gray-300 p-6 shadow-sm">
          <h2 className="text-3xl font-semibold mb-6">Edit User</h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold">Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Username</label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full border p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Role</label>

              <select
                name="userRole"
                value={formData.userRole}
                onChange={handleChange}
                className="w-full border p-3"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isActive: e.target.checked,
                    })
                  }
                />
                Active User
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleUpdate}
                className="bg-[#333333] text-white px-8 py-3"
              >
                Update User
              </button>

              <button
                onClick={() => navigate("/users")}
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
