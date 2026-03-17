import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployeeHeader from "../../HR-component/employee-components/EmployeeHeader";
import EmployeeSummaryCard from "../../HR-component/employee-components/EmployeeSummaryCard";
import EmployeeModal from "../../HR-component/employee-components/EmployeeModal";

import Loader from "../../../components/Loader";

import {
 getEmployeesApi,
} from "../../../api/employee-Api";

export default function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [mode, setMode] = useState("view");

  /* ================= Fetch Employees ================= */
  // console.log("employees", employees);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const res = await getEmployeesApi();
      setEmployees(res.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ================= Search ================= */

  const filteredEmployees = employees.filter((emp) =>
    emp.personal?.fullName?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 w-full">
      {/* ================= Page Header ================= */}

      <EmployeeHeader />

      {/* ================= Summary Cards ================= */}

      <EmployeeSummaryCard employees={employees} />

      {/* ================= Employee Table Card ================= */}

      <div className="card bg-base-100 shadow-xl border border-base-200">
        {/* ================= Table Header ================= */}

        <div className="card-body border-b border-base-200 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="font-semibold text-lg">Employees List</h2>

              <p className="text-xs opacity-60">
                Manage all employees in one place
              </p>
            </div>

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered input-sm w-full md:w-60"
            />
          </div>
        </div>

        {/* ================= Table ================= */}

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 flex justify-center">
              <Loader />
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="p-10 text-center text-sm opacity-60">
              No employees found
            </div>
          ) : (
            <table className="table table-zebra">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Contact</th>
                  <th>Department</th>
                  <th>City</th>
                  <th>DOJ</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp._id} className="hover">
                    {/* ================= Employee Info ================= */}

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <img
                              src={emp.personal?.profilePhoto}
                              alt="profile"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold">
                            {emp.personal?.fullName}
                          </div>

                          <div className="text-xs opacity-60">
                            {emp.account?.officialEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* ================= Emp ID ================= */}

                    <td>
                      <span className=" ">
                        {emp.professional?.employeeId || "-"}
                      </span>
                    </td>

                    {/* ================= Contact ================= */}

                    <td>
                      <span className="">
                        {emp.contact?.primaryPhone || "-"}
                      </span>
                    </td>

                    {/* ================= Department ================= */}

                    <td>{emp.professional?.department || "-"}</td>

                    {/* ================= City ================= */}

                    <td>
                      <span className="">
                        {emp.address?.current?.city || "-"}
                      </span>
                    </td>

                    {/* ================= DOJ ================= */}

                    <td>
                      {emp.professional?.dateOfJoining
                        ? new Date(
                            emp.professional.dateOfJoining,
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* ================= Actions ================= */}

                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          className="btn btn-xs btn-info"
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setMode("view");
                          }}
                        >
                          👁
                        </button>

                        <button
                          className="btn btn-xs btn-warning"
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setMode("edit");
                          }}
                        >
                          ✏
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ================= Footer ================= */}

        <div className="card-body border-t border-base-200 py-3 text-xs opacity-70">
          Showing {filteredEmployees.length} employees
        </div>
      </div>

      {/* ================= Modal ================= */}

      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          mode={mode}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
