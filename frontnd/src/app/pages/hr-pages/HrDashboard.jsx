import React from "react";
import {
  FaHome,
  FaArrowUp,
  FaUsers,
  FaTasks,
  FaMoneyCheckAlt,
  FaEllipsisV,
} from "react-icons/fa";

import { ImWindows } from "react-icons/im";
import { MdClear } from "react-icons/md";
import { attendanceData, employees } from "../../../data/Dummy-Data";

const HrDashboard = () => {
  // Dummy avatar images (replace with your own or use placeholder services)
  const avatars = [
    "https://i.pravatar.cc/40?img=1",
    "https://i.pravatar.cc/40?img=2",
    "https://i.pravatar.cc/40?img=3",
    "https://i.pravatar.cc/40?img=4",
    "https://i.pravatar.cc/40?img=5",
    "https://i.pravatar.cc/40?img=6",
    "https://i.pravatar.cc/40?img=7",
    "https://i.pravatar.cc/40?img=8",
    "https://i.pravatar.cc/40?img=9",
  ];

  // Dummy todo items
  const todos = [
    "Add salary details in system",
    "Announcement for holiday",
    "call bus driver",
    "Office Picnic",
    "Website Must Be Finished",
    "Recharge My Mobile",
    "Add salary details in system",
  ];

  return (
    <section className="content p-4">
      <div className="container-fluid">
        {/* Breadcrumb */}
        <div className="block-header mb-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <h4 className="text-xl font-semibold mr-4">Dashboard</h4>
            <ul className="flex items-center gap-2 text-gray-600">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <FaHome /> Home
                </a>
              </li>
              <li className="text-gray-400">/</li>
              <li className="active">Dashboard</li>
            </ul>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Card 1 */}
          <div className="card bg-purple-600 text-white shadow-lg">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <ImWindows className="text-4xl opacity-50" />
                <span className="text-sm font-bold">
                  24.7% <FaArrowUp className="inline" />
                </span>
              </div>
              <h5 className="text-lg font-medium mt-2">Projects</h5>
              <h2 className="text-3xl font-bold">125</h2>
              <progress
                className="progress progress-primary w-full h-2 mt-2"
                value="25"
                max="100"
              ></progress>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-blue-800 text-white shadow-lg">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <FaUsers className="text-4xl opacity-50" />
                <span className="text-sm font-bold">
                  5.28% <FaArrowUp className="inline" />
                </span>
              </div>
              <h5 className="text-lg font-medium mt-2">New Employee</h5>
              <h2 className="text-3xl font-bold">213</h2>
              <progress
                className="progress progress-success w-full h-2 mt-2"
                value="25"
                max="100"
              ></progress>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-green-700 text-white shadow-lg">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <FaTasks className="text-4xl opacity-50" />
                <span className="text-sm font-bold">
                  16% <FaArrowUp className="inline" />
                </span>
              </div>
              <h5 className="text-lg font-medium mt-2">Running Tasks</h5>
              <h2 className="text-3xl font-bold">10,225</h2>
              <progress
                className="progress progress-warning w-full h-2 mt-2"
                value="25"
                max="100"
              ></progress>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card bg-orange-600 text-white shadow-lg">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <FaMoneyCheckAlt className="text-4xl opacity-50" />
                <span className="text-sm font-bold">
                  5.07% <FaArrowUp className="inline" />
                </span>
              </div>
              <h5 className="text-lg font-medium mt-2">Earning</h5>
              <h2 className="text-3xl font-bold">$2,658</h2>
              <progress
                className="progress progress-primary w-full h-2 mt-2"
                value="25"
                max="100"
              ></progress>
            </div>
          </div>
        </div>

        {/* Employee Details and TODO List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Employee Details Table */}
          <div className="card shadow-lg lg:col-span-2 bg-base-100">
            <div className="card-header p-4 border-b">
              <h2 className="text-lg font-semibold">
                <strong>Active Employees</strong>
              </h2>
            </div>

            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
              <table className="table w-full">
                <thead className="sticky top-0 bg-base-100">
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joining Date</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover">
                      <td>
                        <div>
                          <div className="font-medium">{emp.name}</div>
                          <div className="text-xs opacity-60">{emp.email}</div>
                        </div>
                      </td>

                      <td>{emp.department}</td>

                      <td>
                        <span className={`badge ${emp.roleClass} badge-sm`}>
                          {emp.role}
                        </span>
                      </td>

                      <td>
                        <span className="badge badge-success badge-sm">
                          {emp.status}
                        </span>
                      </td>

                      <td className="text-sm opacity-70">{emp.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TODO List */}
          <div className="card shadow-lg">
            {/* Header */}
            <div className="card-header bg-base-100 p-4 border-b flex justify-between items-center">
              <h2 className="text-md font-semibold">
                <strong>Today Attendance</strong>
              </h2>

              <div className="flex gap-2">
                <span className="badge badge-success badge-sm">
                  Present:{" "}
                  {attendanceData.filter((e) => e.status === "Present").length}
                </span>
                <span className="badge badge-error badge-sm">
                  Absent:{" "}
                  {attendanceData.filter((e) => e.status === "Absent").length}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="card-body p-4 max-h-[350px] overflow-y-auto no-scrollbar">
              <ul className="space-y-3">
                {attendanceData.map((emp) => (
                  <li
                    key={emp.id}
                    className="flex items-center justify-between bg-base-200 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-xs opacity-60">{emp.department}</p>
                    </div>

                    <span
                      className={`badge badge-sm ${
                        emp.status === "Present"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Three Additional Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card shadow-lg">
            <div className="card-header bg-base-100 p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Chart 1</h2>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
                  <FaEllipsisV />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                >
                  <li>
                    <a>Action</a>
                  </li>
                  <li>
                    <a>Another action</a>
                  </li>
                  <li>
                    <a>Something else here</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 rounded">
                Chart 1
              </div>
            </div>
          </div>
          <div className="card shadow-lg">
            <div className="card-header bg-base-100 p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Chart 2</h2>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
                  <FaEllipsisV />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                >
                  <li>
                    <a>Action</a>
                  </li>
                  <li>
                    <a>Another action</a>
                  </li>
                  <li>
                    <a>Something else here</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 rounded">
                Chart 2
              </div>
            </div>
          </div>
          <div className="card shadow-lg">
            <div className="card-header bg-base-100 p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Chart 3</h2>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
                  <FaEllipsisV />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                >
                  <li>
                    <a>Action</a>
                  </li>
                  <li>
                    <a>Another action</a>
                  </li>
                  <li>
                    <a>Something else here</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500 rounded">
                Chart 3
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HrDashboard;
