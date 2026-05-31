import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Reports() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadReport = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/active-users");

      setUsers(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

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

            <button
              onClick={() => navigate("/moderation")}
              className="w-full bg-[#5a5a5a] text-white py-2"
            >
              Post Moderation
            </button>

            {/* Active Menu */}

            <button className="w-full bg-[#8a8a8a] text-white py-2">
              Reports
            </button>
          </div>
        </div>

        {/* Content */}

        <div className="bg-white mt-4 border border-gray-300 p-6">
          <h2 className="text-3xl font-semibold mb-6">Most Active Users</h2>

          {loading ? (
            <div className="text-center py-10">Loading Report...</div>
          ) : (
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-[#333333] text-white">
                  <th className="p-3 text-left w-[10%]">User ID</th>

                  <th className="p-3 text-left w-[30%]">Full Name</th>

                  <th className="p-3 text-left w-[35%]">Email</th>

                  <th className="p-3 text-center w-[15%]">Total Posts</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.userId} className="border-b">
                    <td className="p-4">{user.userId}</td>

                    <td className="p-4">{user.fullName}</td>

                    <td className="p-4 break-all">{user.email}</td>

                    <td className="p-4 text-center font-semibold">
                      {user.totalPosts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}

        <div className="bg-[#333333] text-white text-center py-5 mt-8">
          © 2026 Blog Platform
        </div>
      </div>
    </div>
  );
}
