import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    fullName: "",
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showToast = (message, type) => {
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

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!emailRegex.test(formData.email)) {
      showToast("Please enter a valid email", "error");

      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      showToast(
        "Password must be at least 6 characters and contain letters and numbers",
        "error",
      );

      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/user/create-account",
        formData,
      );

      if (response.data.status === "SUCCESS") {
        showToast("Signup Successful", "success");

        setFormData({
          userName: "",
          password: "",
          email: "",
          fullName: "",
        });
      }
    } catch (error) {
      showToast(
        error.response?.data?.message || "Registration Failed",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        {toast.show && (
          <div
            className={`mb-4 p-3 rounded text-white text-center ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        )}

        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6">Registration</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Username:</label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Password:</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Email:</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2">Full Name:</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border rounded p-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="/" className="text-blue-600 underline">
              Already have an account? Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
