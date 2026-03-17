import React from "react";

/* ---------- Dummy Data ---------- */
const newHires = [
  {
    id: 1,
    name: "Ram Potter",
    email: "ram12@gmail.com",
    jobTitle: "UI/UX Designer",
    joiningDate: "Jan 7, 2025",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 2,
    name: "Ram Potter",
    email: "ram12@gmail.com",
    jobTitle: "UI/UX Designer",
    joiningDate: "Jan 7, 2025",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 3,
    name: "Ram Potter",
    email: "ram12@gmail.com",
    jobTitle: "UI/UX Designer",
    joiningDate: "Jan 7, 2025",
    avatar: "https://i.pravatar.cc/100?img=13",
  },
];

export default function NewHiresThisMonth() {
  return (
    <div
      className="
        w-full
        max-w-xl
        rounded-xl
        bg-white
        p-2
        shadow-md
      "
    >
      {/* Title */}
      <h2 className="mb-3 text-sm font-semibold text-gray-900">
        New Hires This Month
      </h2>

      {/* Header Pills */}
      <div className="mb-3 flex rounded-full bg-blue-100 p-0.5 text-[11px]">
        <div className="flex-1 rounded-full bg-white py-0.5 text-center font-medium text-blue-600 shadow-sm">
          Employee
        </div>
        <div className="flex-1 py-0.5 text-center font-medium text-blue-600">
          Job Title
        </div>
        <div className="flex-1 py-0.5 text-center font-medium text-blue-600">
          Date
        </div>
      </div>

      {/* List */}
      <div className="max-h-[180px] overflow-y-auto space-y-3 pr-1">
        {newHires.map((hire) => (
          <div
            key={hire.id}
            className="flex items-center justify-between gap-3"
          >
            {/* Employee */}
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={hire.avatar}
                alt={hire.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-gray-900">
                  {hire.name}
                </p>
                <p className="truncate text-[10px] text-gray-400">
                  {hire.email}
                </p>
              </div>
            </div>

            {/* Job Title */}
            <span className="whitespace-nowrap rounded-full border border-blue-400 px-2 py-0.5 text-[10px] font-medium text-blue-500">
              {hire.jobTitle}
            </span>

            {/* Joining Date */}
            <p className="whitespace-nowrap text-[11px] text-gray-600">
              {hire.joiningDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
