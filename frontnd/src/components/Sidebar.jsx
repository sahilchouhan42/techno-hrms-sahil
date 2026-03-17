import { NavLink, useNavigate } from "react-router-dom";
import logo from ".././assets/logo.jpg";
import { Headphones, LogOut } from "lucide-react";
import { menu } from "../data/Dummy-Data";
import { logOutApi } from "../api/auth-Api.js";

export default function Sidebar({ role, sidebarOpen }) {
  const navigate= useNavigate()
  const handleLogout = async ()=>{
    await logOutApi()
    localStorage.removeItem("accessToken")
    navigate('/login')
  }
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-68 bg-base-100 border-r border-base-300 flex flex-col justify-between px-4 py-2 transition-transform duration-300 z-40 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div>
        <div className="mb-4 px-2">
          <img
            src={logo}
            alt="Technorizen"
            className="h-24 w-full object-contain"
          />
        </div>

        {/* Menu */}
        <ul className="menu p-0 gap-1">
          {menu[role]?.map((item, index) => (
            <li key={index}>
              <NavLink
                end
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg text-sm font-normal transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-content shadow-md"
                      : "hover:bg-base-200"
                  }`
                }
              >
                <item.icon size={18} />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2 px-2">
        <NavLink
          to={`/${role}/support`}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg text-sm font-medium px-3 py-2 transition-all
            ${
              isActive
                ? "bg-primary text-primary-content shadow-md"
                : "bg-base-200 hover:bg-base-300"
            }`
          }
        >
          <Headphones size={18} />
          Contact Support
        </NavLink>

        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-error hover:bg-base-200 rounded-lg transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
