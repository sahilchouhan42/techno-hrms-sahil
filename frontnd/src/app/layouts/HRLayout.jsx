import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const HRLayout = () => {
  const user = JSON.parse(localStorage.getItem("technoUser" || "{}"));
  const role = user?.role;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-base-200">
      
      {/* Sidebar */}
      <Sidebar role={role} sidebarOpen={sidebarOpen} />

      {/* Right Section */}
      <div
        className={`flex flex-col h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-68" : "ml-0"
        }`}
      >
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Scroll Area */}
        <main className="flex-1 overflow-auto px-2 py-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HRLayout;
