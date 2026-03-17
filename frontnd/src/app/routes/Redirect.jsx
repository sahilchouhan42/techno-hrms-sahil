// src/routes/Redirect.jsx
import { Navigate } from "react-router-dom";

const Redirect = () => {
  const storedUser = localStorage.getItem("technoUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ✅ No user → Login Page
  if (!user) {
    return <Navigate to="/visitorPage" replace />;
    // return <Navigate to="/login" replace />;
  }

  // ✅ Role Based Redirect
  if (user.role === "hr") {
    return <Navigate to="/hr/dashboard" replace />;
  }

  if (user.role === "employee") {
    return <Navigate to="/employee/dashboard" replace />;
  }

  // fallback
  return <Navigate to="/visitorPage" replace />;
  // return <Navigate to="/login" replace />;
};

export default Redirect;
