export default function EmployeesLeaveManagement() {
  return (
    <div className="flex w-full max-w-4xl items-center justify-between rounded-xl bg-white p-6 shadow-sm">
      {/* Left Section */}
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Employees Leave Management
          </h2>
        </div>

        {/* Status Pills */}
        <StatusPill
          label="Pending"
          value={12}
          bg="bg-red-100"
          text="text-red-900"
        />

        <StatusPill
          label="Approved"
          value={15}
          bg="bg-lime-200"
          text="text-gray-900"
        />

        <StatusPill
          label="Rejected"
          value={3}
          bg="bg-indigo-100"
          text="text-gray-900"
        />
      </div>

      {/* Right Section */}
      <div className="relative flex flex-col items-end">
        <button className="mb-4 flex items-center gap-1 text-xs text-gray-400">
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

        <LeaveDonut />
      </div>
    </div>
  );
}

/* ---------- Status Pill ---------- */
function StatusPill({ label, value, bg, text }) {
  return (
    <div
      className={`flex w-64 items-center justify-between rounded-lg px-4 py-2 text-sm ${bg} ${text}`}
    >
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

/* ---------- Donut Chart ---------- */
function LeaveDonut() {
  /*
    Values:
    Pending   → 12
    Approved  → 15
    Rejected  → 3
    Total     → 30
  */

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Background Ring */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#eef2ff"
        strokeWidth="18"
      />

      {/* Approved */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#d9f99d"
        strokeWidth="18"
        strokeDasharray="251 502"
        strokeDashoffset="0"
        transform="rotate(-90 100 100)"
      />

      {/* Pending */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#fee2e2"
        strokeWidth="18"
        strokeDasharray="201 502"
        strokeDashoffset="-251"
        transform="rotate(-90 100 100)"
      />

      {/* Rejected */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#e0e7ff"
        strokeWidth="18"
        strokeDasharray="50 502"
        strokeDashoffset="-452"
        transform="rotate(-90 100 100)"
      />
    </svg>
  );
}
