import React from "react";

const payrollData = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: "Andrew Charlie",
  role: "HRMS-Admin",
  avatar: "https://i.pravatar.cc/40?img=12",
  startDate: "Dec 29, 2024",
  endDate: "Jan 28, 2025",
  days: 22,
  hours: "176h 39m",
  amount: "20,000/-",
  status: i === 1 ? "Unpaid" : "Paid",
}));

export default function PayrollList() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">Payroll List</h2>

        <div className="flex items-center gap-2">
          <input
            placeholder="Search Keyword"
            className="rounded-md border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-gray-300"
          />
          <button className="rounded-md border border-gray-200 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-gray-200 bg-gray-50 text-gray-500">
            <tr>
              <th className="px-3 py-2">
                <input type="checkbox" />
              </th>
              <th className="px-3 py-2">Employee Name</th>
              <th className="px-3 py-2">Start Date</th>
              <th className="px-3 py-2">End Date</th>
              <th className="px-3 py-2">Total Days</th>
              <th className="px-3 py-2">Total Hours</th>
              <th className="px-3 py-2">Invoice Amount</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>

          <tbody>
            {payrollData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 last:border-0 hover:bg-gray-50"
              >
                <td className="px-3 py-3">
                  <input type="checkbox" />
                </td>

                {/* Employee */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.avatar}
                      className="h-7 w-7 rounded-full"
                      alt=""
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-[10px] text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-3 text-gray-600">{item.startDate}</td>
                <td className="px-3 py-3 text-gray-600">{item.endDate}</td>
                <td className="px-3 py-3 text-gray-600">{item.days}</td>
                <td className="px-3 py-3 text-gray-600">{item.hours}</td>
                <td className="px-3 py-3 font-medium text-gray-700">
                  {item.amount}
                </td>

                {/* Status */}
                <td className="px-3 py-3">
                  {item.status === "Paid" ? (
                    <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-medium text-green-700">
                      Paid
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-medium text-red-600">
                      Unpaid
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <button className="rounded-md border border-gray-200 px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-50">
                      Details
                    </button>
                    <button className="rounded-md border border-gray-200 px-2 py-1 text-[10px] text-blue-600 hover:bg-gray-50">
                      Pay
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <p>Items per page: 10 &nbsp; | &nbsp; 1–10 of 200 items</p>
        <p>1 of 44 pages</p>
      </div>
    </div>
  );
}
