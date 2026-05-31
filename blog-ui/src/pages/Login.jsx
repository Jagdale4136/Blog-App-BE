import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await login({
        userName,
        password,
      });

      const token = response.data.data.token;

      localStorage.setItem("token", token);

      navigate("/dashboard");

      console.log(token);
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-[400px]">
        <h2 className="text-2xl font-bold mb-6">Login Page</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>

            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/register" className="text-blue-600 underline">
            New user? Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
