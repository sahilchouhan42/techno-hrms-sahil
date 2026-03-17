import React, { useState } from "react";

const people = [
  {
    id: 1,
    name: "Andrew Charlie",
    role: "UI/UX Designer",
    status: "Sick Leave",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Hitesh Potter",
    role: "Web developer",
    status: "Annual Leave",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 3,
    name: "Rose Parker",
    role: "UI/UX Designer",
    status: "Work From Home",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
];

export default function JanuaryOverview() {
  const [activeTab, setActiveTab] = useState("timeoff");

  return (
    <div className="
      w-full
      max-w-xs
      rounded-xl
      bg-white
      p-3
      shadow-md
    ">
      {/* Header */}
      <h2 className="mb-2 text-sm font-semibold text-gray-900">
        What’s on in January?
      </h2>

      {/* Tabs */}
      <div className="mb-3 flex rounded-full bg-blue-100 p-0.5">
        <button
          onClick={() => setActiveTab("timeoff")}
          className={`flex-1 rounded-full px-2 py-1 text-xs font-medium transition ${
            activeTab === "timeoff"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-blue-600"
          }`}
        >
          Time Off
        </button>
        <button
          onClick={() => setActiveTab("birthday")}
          className={`flex-1 rounded-full px-2 py-1 text-xs font-medium transition ${
            activeTab === "birthday"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-blue-600"
          }`}
        >
          Birthday
        </button>
      </div>

      {/* List */}
      <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1">
        {people.map((person) => (
          <div
            key={person.id}
            className="flex items-center gap-3 border-b border-gray-100 pb-2 last:border-none last:pb-0"
          >
            <img
              src={person.avatar}
              alt={person.name}
              className="h-8 w-8 rounded-full object-cover"
            />

            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-900">
                {person.name}
              </p>
              <p className="text-[10px] text-gray-400">
                {person.role} • {person.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
