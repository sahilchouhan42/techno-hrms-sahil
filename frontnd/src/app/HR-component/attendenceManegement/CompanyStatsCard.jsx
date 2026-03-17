export default function CompanyStatsCard() {
 
  return (
    <div className="w-full rounded-xl bg-white px-5 py-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          Attendance Overview
        </h2>

        <button className="flex items-center gap-1 text-xs text-gray-400">
          This Week
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex items-center justify-between gap-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4">
          {/* Legend */}
          <div className="flex flex-col gap-2 text-xs text-gray-500">
            <Legend color="bg-green-500" label="Present Today" />
            <Legend color="bg-blue-400" label="On Leave" />
            <Legend color="bg-red-500" label="Absent" />
          </div>

          {/* Leave Pills */}
        
        </div>

        {/* RIGHT SIDE */}
        <DonutChart />
      </div>
    </div>
  );
}

/* ---------- Legend ---------- */
function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}

/* ---------- Status Pill ---------- */
function StatusPill({ label, value, bg }) {
  return (
    <div
      className={`flex w-56 items-center justify-between rounded-lg px-4 py-1.5 text-xs text-gray-900 ${bg}`}
    >
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

/* ---------- Donut Chart ---------- */
function DonutChart() {
  return (
    <svg width="160" height="160" viewBox="0 0 200 200">
      {/* Background */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#eef2ff"
        strokeWidth="18"
      />

      {/* Present */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#22c55e"
        strokeWidth="18"
        strokeDasharray="326 502"
        transform="rotate(-90 100 100)"
      />

      {/* On Leave */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="18"
        strokeDasharray="75 502"
        strokeDashoffset="-326"
        transform="rotate(-90 100 100)"
      />

      {/* Absent */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#ef4444"
        strokeWidth="18"
        strokeDasharray="101 502"
        strokeDashoffset="-401"
        transform="rotate(-90 100 100)"
      />
    </svg>
  );
}
