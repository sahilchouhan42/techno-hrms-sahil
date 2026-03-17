import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const EmployeeLayout = () => {
  const user = JSON.parse(localStorage.getItem("technoUser") || "{}");
  const role = user.role || "employee";

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen bg-base-200">
      
      {/* Sidebar (Fixed + Animated) */}
      <Sidebar role={role} sidebarOpen={sidebarOpen} />

      {/* Right Section */}
      <div
        className={`flex flex-col h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-68" : "ml-0"
        }`}
      >
        {/* Header */}
        <Header
          role={role}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Scroll Area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
