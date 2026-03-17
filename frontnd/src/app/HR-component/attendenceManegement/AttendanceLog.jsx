import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getTodayAttendanceApi } from "../../../api/attendanceApi";

export default function AttendanceLog() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  console.log("Employees:", employees);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await getTodayAttendanceApi();
      console.log("res:", res);
      setEmployees(res || []);
      setFilteredEmployees(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((emp) =>
      emp.name?.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredEmployees(filtered);
  }, [search, employees]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return "badge badge-success badge-sm";
      case "half-day":
        return "badge badge-warning badge-sm";
      case "leave":
        return "badge badge-info badge-sm";
      default:
        return "badge badge-error badge-sm";
    }
  };

  const presentCount = employees.filter(
    (e) => e.todayStatus === "present",
  ).length;
  const halfDayCount = employees.filter(
    (e) => e.todayStatus === "half-day",
  ).length;
  const absentCount = employees.filter(
    (e) => !e.todayStatus || e.todayStatus === "absent",
  ).length;

  const formatTime = (time) =>
    time
      ? new Date(time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Employee Attendance</h1>
          <p className="text-sm opacity-60">Today's attendance overview</p>
        </div>

        <input
          type="text"
          placeholder="Search employee..."
          className="input input-bordered input-sm w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm">
          <p className="text-sm opacity-70">Present</p>
          <p className="text-3xl font-bold text-success">0</p>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm">
          <p className="text-sm opacity-70">Half Day</p>
          <p className="text-3xl font-bold text-warning">0</p>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm">
          <p className="text-sm opacity-70">Absent</p>
          <p className="text-3xl font-bold text-error">0</p>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto bg-base-100 shadow rounded-xl ">
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => {
              const initials = emp.name
                ?.split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <tr key={emp._id} className="hover">
                  {/* Employee */}

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
                          <span className="text-sm font-semibold">
                            {initials}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="font-medium">{emp.name}</div>
                        <div className="text-xs opacity-60">{emp.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}

                  <td>
                    <span className={getStatusBadge(emp.todayStatus)}>
                      {emp.todayStatus || "absent"}
                    </span>
                  </td>

                  {/* CheckIn */}

                  <td>{formatTime(emp.checkIn)}</td>

                  {/* CheckOut */}

                  <td>{formatTime(emp.checkOut)}</td>

                  {/* Hours */}

                  <td>{emp.totalHours ? `${emp.totalHours} h` : "-"}</td>

                  {/* Action */}

                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() => navigate(`/hr/attendanceDetails/${emp._id}`)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
