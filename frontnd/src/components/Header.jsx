import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  MessageSquare,
  Menu,
  Sun,
  Moon,
} from "lucide-react";

export default function Header({ onSearch, sidebarOpen, setSidebarOpen }) {
  const [search, setSearch] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setOpenNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <header
      className={`transition-all duration-300 bg-base-100 border-b border-base-300 shadow-sm px-4 md:px-6 py-3 flex items-center justify-between gap-4 ${
        sidebarOpen ? "ml-0" : "ml-0"
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        {/* Hamburger */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="btn btn-ghost btn-sm"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
            size={18}
          />
          <input
            type="text"
            placeholder="Search Employee by Name or ID"
            value={search}
            onChange={(e) => onSearch?.(e.target.value)}
            className="input input-bordered w-full pl-10 text-sm"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="relative flex items-center gap-3" ref={notifRef}>
        {/* Dark / Light Toggle */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button className="btn btn-ghost btn-sm">
          <MessageSquare size={18} />
        </button>

        <button
          onClick={() => setOpenNotif(!openNotif)}
          className={`btn btn-sm ${
            openNotif ? "btn-primary" : "btn-ghost"
          }`}
        >
          <Bell size={18} />
        </button>

        {/* Notification Popup */}
        {openNotif && (
          <div className="absolute right-0 top-14 w-64 md:w-72 z-50">
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body p-4 max-h-72 overflow-y-auto">
                <h3 className="font-semibold text-base">Notification</h3>

                <div className="mt-2">
                  <p className="text-xs opacity-60 mb-1">Recent</p>
                  <NotifItem
                    text="Leave request submitted by Rahul Mehra."
                    time="37 min"
                  />
                  <NotifItem
                    text="New hire documents uploaded by Ravi Nair."
                    time="31 min"
                  />
                </div>

                <div className="mt-3">
                  <p className="text-xs opacity-60 mb-1">Earlier</p>
                  <NotifItem
                    text="Goal update submitted by Devika Shah."
                    time="31 min"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* Notification Item */
function NotifItem({ text, time }) {
  return (
    <div className="flex gap-3 items-start py-2">
      <div className="h-9 w-9 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        <Bell size={16} />
      </div>
      <div className="flex-1">
        <p className="text-sm">{text}</p>
        <span className="text-xs opacity-60">{time}</span>
      </div>
    </div>
  );
}
