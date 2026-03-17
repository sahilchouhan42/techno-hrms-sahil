import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getEmployeeAttendanceApi } from "../../../api/attendanceApi";
import { dummyAttendance } from "../../../data/dummyAttendance";

export default function EmployeeAttendanceCalendar() {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  console.log(attendance);

  const fetchAttendance = async () => {
    try {
      const res = await getEmployeeAttendanceApi();
      setAttendance(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // fetchAttendance();
    setAttendance(dummyAttendance);
  }, []);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const getAttendance = (date) => {
    const formatted = formatDate(date);

    return attendance.find((item) => item.date.split("T")[0] === formatted);
  };

  const getTileClass = ({ date }) => {
    const record = getAttendance(date);

    if (!record) return "absent";

    switch (record.status) {
      case "present":
        return "present";

      case "half-day":
        return "halfday";

      case "leave":
        return "leave";

      default:
        return "absent";
    }
  };

  const handleDateClick = (date) => {
    const record = getAttendance(date);
    setSelectedDate(record);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Employee Attendance Calendar</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}

        <div className="bg-base-100 p-5 rounded-xl border shadow">
          <Calendar tileClassName={getTileClass} onClickDay={handleDateClick} />
        </div>

        {/* Attendance Details */}

        <div className="bg-base-100 p-5 rounded-xl border shadow">
          <h2 className="text-lg font-medium mb-4">Attendance Details</h2>

          {selectedDate ? (
            <div className="space-y-3">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="badge badge-warning">
                  {selectedDate.status}
                </span>
              </p>

              <p>
                <span className="font-medium">Check In:</span>{" "}
                {selectedDate.checkIn
                  ? new Date(selectedDate.checkIn).toLocaleTimeString()
                  : "-"}
              </p>

              <p>
                <span className="font-medium">Check Out:</span>{" "}
                {selectedDate.checkOut
                  ? new Date(selectedDate.checkOut).toLocaleTimeString()
                  : "-"}
              </p>

              <p>
                <span className="font-medium">Total Hours:</span>{" "}
                {selectedDate.totalHours || "-"}
              </p>

              <p>
                <span className="font-medium">Source:</span>{" "}
                {selectedDate.source}
              </p>
            </div>
          ) : (
            <p className="opacity-60 text-sm">
              Click a date to see attendance details
            </p>
          )}
        </div>
      </div>

      {/* Legend */}

      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 rounded"></span>
          Present
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-400 rounded"></span>
          Half Day
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-400 rounded"></span>
          Leave
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded"></span>
          Absent
        </div>
      </div>

      <style>
        {`
.react-calendar__tile.present {
  background: #22c55e !important;
  color: white;
  border-radius: 6px;
}

.react-calendar__tile.absent {
  background: #ef4444 !important;
  color: white;
  border-radius: 6px;
}

.react-calendar__tile.halfday {
  background: #facc15 !important;
  color: black;
  border-radius: 6px;
}

.react-calendar__tile.leave {
  background: #38bdf8 !important;
  color: white;
  border-radius: 6px;
}

        `}
      </style>
    </div>
  );
}
