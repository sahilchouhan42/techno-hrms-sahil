import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../api/auth-Api";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await forgotPasswordApi({ email });

      setMessage(res.message);

    } catch (error) {

      setMessage(error.message || "Something went wrong");

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

        {/* Tab */}
        <div className="mb-6">
          <div className="w-full py-2 rounded-md bg-linear-to-r from-blue-500 to-blue-800 text-white font-medium text-center">
            Forgot Password
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-white/50 rounded-md px-4 py-3 text-white placeholder:text-gray-200 focus:outline-none focus:border-blue-400"
          />

          {/* Submit */}
          <button
            type="submit"
            className="block w-[40%] mx-auto py-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-900 font-semibold text-white hover:opacity-90 transition"
          >
            Send Link
          </button>

        </form>

        {/* Message */}
        {message && (
          <p className="text-center mt-4 text-green-300">
            {message}
          </p>
        )}

        {/* Back to login */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-300 hover:text-white underline text-sm"
          >
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;