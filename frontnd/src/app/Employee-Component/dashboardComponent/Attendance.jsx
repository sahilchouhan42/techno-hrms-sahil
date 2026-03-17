import { useState, useEffect } from "react";

export default function Attendance() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [time, setTime] = useState("07:49:56");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-0 max-w-6xl mx-auto">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src="https://i.pravatar.cc/100" />
            </div>
          </div>

          <div>
            <h2 className="font-semibold">Grayson</h2>
            <p className="text-sm opacity-80">Full Stack Developer</p>
          </div>
        </div>

        <button className="btn btn-circle btn-ghost">
          🔔
        </button>
      </div>

      {/* Holiday Card */}
      <div className="card bg-base-100 shadow mt-4">
        <div className="card-body flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Apr 18, 2025</p>
            <h3 className="font-semibold">Good Friday</h3>
          </div>

          <div className="badge badge-warning">
            Public Holiday
          </div>
        </div>
      </div>

      {/* Main Attendance Section */}
      <div className="grid lg:grid-cols-2 gap-4 mt-4">

        {/* LEFT SIDE (Working Summary) */}
      <div className="card bg-base-100 shadow">
  <div className="card-body text-center">

    <h2 className="text-lg font-semibold">
      Working Hours
    </h2>

    <div
      className="radial-progress text-blue-500 my-4"
      style={{
        "--value": 75,
        "--size": "12rem",
        "--thickness": "12px",
        "--track": "#e5e7eb"
      }}
    >
      19:38:10
    </div>

    <div className="flex justify-between text-sm mt-4">

      <div>
        <p className="text-gray-500">Clock In</p>
        <p className="font-semibold">09:00 AM</p>
      </div>

      <div>
        <p className="text-gray-500">Clock Out</p>
        <p className="font-semibold">06:20 PM</p>
      </div>

    </div>

  </div>
</div>

        {/* RIGHT SIDE (Buttons) */}
        <div className="card bg-base-100 shadow">
          <div className="card-body flex flex-col justify-center items-center gap-4">

            {!checkedIn ? (
              <button
                className="btn btn-success w-full"
                onClick={() => setCheckedIn(true)}
              >
                Check In
              </button>
            ) : (
              <button
                className="btn btn-error w-full"
                onClick={() => setCheckedIn(false)}
              >
                Check Out
              </button>
            )}

            <button className="btn btn-outline w-full">
              View Attendance
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}