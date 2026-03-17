import React, { useEffect, useState } from "react";

const MAX_HOURS = 12;

/* 🔥 Strong & visible colors */
const WORK_COLORS = [
  "bg-emerald-500",
  "bg-green-500",
  "bg-lime-500",
  "bg-emerald-600",
];

const OVER_COLORS = [
  "bg-orange-400",
  "bg-pink-400",
  "bg-rose-400",
  "bg-orange-500",
];

export default function EmployeesWorkHours() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      { day: "Jan 5", work: 7, overtime: 2 },
      { day: "Jan 6", work: 5, overtime: 3 },
      { day: "Jan 7", work: 8, overtime: 1 },
      { day: "Jan 8", work: 7, overtime: 2 },
      { day: "Jan 9", work: 6, overtime: 3 },
    ]);
  }, []);

  const avg =
    data.reduce((s, d) => s + d.work + d.overtime, 0) /
    data.length;

  return (
    <div className="w-full max-w-xl rounded-xl bg-white p-4 shadow-md">
      <h3 className="mb-2 text-xs font-medium text-gray-600">
        Employees Work Hours
      </h3>

      <div className="relative flex h-40 rounded-lg bg-gray-50">
        {/* Bars */}
        <div className="flex flex-1 items-end justify-between px-4 pb-2">
          {data.map((d, i) => {
            const total = d.work + d.overtime;

            return (
              <div key={i} className="flex w-6 flex-col items-center">
                {/* Total (Overtime background) */}
                <div
                  className={`flex w-full flex-col justify-end rounded-full shadow-sm ${
                    OVER_COLORS[i % OVER_COLORS.length]
                  }`}
                  style={{
                    height: `${(total / MAX_HOURS) * 100}%`,
                  }}
                >
                  {/* Work */}
                  <div
                    className={`w-full rounded-full ${
                      WORK_COLORS[i % WORK_COLORS.length]
                    }`}
                    style={{
                      height: `${(d.work / MAX_HOURS) * 100}%`,
                    }}
                  />
                </div>

                <span className="mt-1 text-[10px] font-medium text-gray-500">
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Avg Line (stronger) */}
        <div
          className="pointer-events-none absolute left-0 right-6 border-t-2 border-dashed border-gray-500"
          style={{
            bottom: `${(avg / MAX_HOURS) * 100}%`,
          }}
        >
          <span className="absolute right-0 -top-2 rounded bg-gray-800 px-1.5 py-0.5 text-[9px] text-white">
            avg
          </span>
        </div>

        {/* Y Axis */}
        <div className="ml-2 flex flex-col justify-between text-[10px] font-medium text-gray-500">
          <span>12h</span>
          <span>8h</span>
          <span>4h</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
}
