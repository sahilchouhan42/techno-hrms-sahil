import React from "react";
import {
  Users,
  CreditCard,
  UserPlus,
} from "lucide-react";

/* ---------- Dummy Data ---------- */
const stats = [
  {
    id: 1,
    title: "Job Applicants",
    value: "500",
    bg: "bg-blue-400",
    iconBg: "bg-white",
    iconColor: "text-blue-500",
    icon: Users,
  },
  {
    id: 2,
    title: "Total Payroll",
    value: "Rs. 785496",
    bg: "bg-red-300",
    iconBg: "bg-white",
    iconColor: "text-red-400",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "Total Employee",
    value: "50",
    bg: "bg-orange-300",
    iconBg: "bg-white",
    iconColor: "text-orange-400",
    icon: UserPlus,
  },
];

export default function DashboardHeader() {
  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-xs text-gray-400">
            Welcome back to HRMS
          </p>
        </div>

        <button className="rounded-lg border px-3 py-1.5 text-xs text-gray-500">
          Jan 2025 - Jan 2025 ⌄
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`flex items-center justify-between rounded-xl px-5 py-2 text-white ${item.bg}`}
            >
              <div>
                <p className="text-xs opacity-90">{item.title}</p>
                <p className="mt-1 text-xl font-bold">
                  {item.value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}
              >
                <Icon
                  size={18}
                  className={item.iconColor}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
