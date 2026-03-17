import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowed }) {
  const user = JSON.parse(localStorage.getItem("technoUser"));
  const accessToken = localStorage.getItem("technoToken"); 
// console.log("ProtectedRoute - User:", user);
// console.log("ProtectedRoute - Access Token:", accessToken);
  // not logged in
  if (!accessToken || !user) {
    return <Navigate to="/visitorPage" replace />;
    // return <Navigate to="/login" replace />;
    
  }

  // role not allowed
  if (allowed && !allowed.includes(user.role)) {
    return <Navigate to="/visitorPage" replace />;
    // return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
