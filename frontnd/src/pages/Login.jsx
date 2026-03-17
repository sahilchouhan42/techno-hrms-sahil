import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth-Api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginApi(formData);

    // Save token
    localStorage.setItem("technoToken", res.accessToken);

    // Save user
    localStorage.setItem("technoUser", JSON.stringify(res.user));

   
    alert("Login successful");

    // redirect
    navigate("/hr");

  } catch (err) {
    alert(err.message || "Login failed");
  }
};


  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: "url('/src/assets/bg-2.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Glass Card */}
      <div className="relative w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <h2 className="text-sm text-gray-200">Welcome to</h2>
        <h1 className="text-2xl text-gray-200 font-semibold mb-6">HRMS</h1>

        {/* Single Tab */}
        <div className="mb-6">
          <div className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-800 text-white font-medium text-center">
            Log In Page
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/50 rounded-md px-4 py-3 text-white placeholder:text-gray-200 focus:outline-none focus:border-blue-400"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/50 rounded-md px-4 py-3 text-white placeholder:text-gray-200 focus:outline-none focus:border-blue-400"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="text-right">
            <button
            onClick={()=>navigate('/forgot-password')}
              type="button"
              className="text-sm text-gray-200 hover:text-white"
            >
              Forget Password
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="block w-[30%] mx-auto py-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-900 font-semibold text-white hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-8 text-center space-y-3">
  <p className="text-sm text-gray-200">Continue without logging in</p>

  <div className="flex justify-center gap-6">
    <button
      type="button"
      onClick={() => navigate("/visitorPage")}
      className="text-blue-300 hover:text-white underline text-sm"
    >
      Visitor
    </button>

    <button
      type="button"
      onClick={() => navigate("/jobs/:slug")}
      className="text-blue-300 hover:text-white underline text-sm"
    >
      View Jobs
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default Login;
