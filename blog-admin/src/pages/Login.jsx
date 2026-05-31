import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/user/log-in", formData);

      const token = response.data.data.token;

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid username or password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-8">Blog Admin</h1>

        <form onSubmit={login}>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
