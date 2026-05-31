import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const loadUsers = async () => {
    try {
      const response = await api.get("/admin/get-all-users");

      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

const handleEdit = (userId) => {
  navigate(`/edit-user/${userId}`);
};

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/admin/user/${userId}`);

      loadUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
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
            <div className="w-[98%] mx-auto">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-[#5a5a5a] text-white py-2"
              >
                Manage Posts
              </button>

              {/* ACTIVE BUTTON */}

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
        </div>

        {/* Content */}
        <div className="bg-white mt-4 border border-gray-300 p-6 shadow-sm">
          <h2 className="text-3xl font-semibold mb-6">Manage Users</h2>

          {loading ? (
            <div className="text-center py-10">Loading Users...</div>
          ) : (
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-[#333333] text-white">
                  <th className="text-left p-3 w-[15%]">Username</th>

                  <th className="text-left p-3 w-[25%]">Email</th>

                  <th className="text-left p-3 w-[10%]">Role</th>

                  <th className="text-left p-3 w-[10%]">Status</th>

                  <th className="text-left p-3 w-[20%]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.userId} className="border-b">
                    <td className="py-10 px-3">{user.userName}</td>

                    <td className="py-10 px-3">{user.email}</td>

                    <td className="py-10 px-3">{user.userRole}</td>

                    <td className="py-10 px-3">
                      {user.isActive ? "Active" : "Inactive"}
                    </td>

                    <td className="py-4 px-3">
                      <div className="flex flex-col gap-2 w-[300px]">
                        <button
                          onClick={() => handleEdit(user.userId)}
                          className="bg-[#333333] text-white py-2"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(user.userId)}
                          className="bg-[#333333] text-white py-2"
                        >
                          Delete
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
