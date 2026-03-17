import React, { useEffect, useState } from "react";
import { getALLVisitorApi } from "../../../api/visitor-Api";
import { useNavigate } from "react-router-dom";
import InterviewScheduleModal from './../../HR-component/model/InterviewScheduleModal';
import Loader from "../../../components/Loader";
import { getAllEmployeesApi } from "../../../api/employee-Api";

export default function AdminVisitorsPage() {
  const [visitors, setVisitors] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [visitorsLoading, setVisitorsLoading] = useState(true);
  const [employeesLoading, setEmployeesLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ================= FETCH VISITORS ================= */
  const fetchVisitors = async () => {
    try {
      setVisitorsLoading(true);
      const res = await getALLVisitorApi();
      setVisitors(res.data || res);
    } catch (err) {
      setError("Failed to fetch visitors");
    } finally {
      setVisitorsLoading(false);
    }
  };

  /* ================= FETCH EMPLOYEES ================= */
  const cleanedFilters = {
    role: "employee",
    active: true,
    status: "approved",
  };

  const fetchEmployees = async () => {
    try {
      setEmployeesLoading(true);
      const res = await getAllEmployeesApi(cleanedFilters);
      // console.log("employees2",res)
      setEmployees(res.data || []);
    } catch (err) {
      setError("Failed to fetch employees");
    } finally {
      setEmployeesLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
    fetchEmployees();
  }, []);

  /* ================= LOADER UI ================= */
  if (visitorsLoading || employeesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
       <Loader/>
      </div>
    );
  }

const filteredVisitors = typeFilter
  ? visitors.filter((v) => v.type === typeFilter)
  : visitors;

  return (
    <div className="p-4 min-h-screen">

    <div className="flex items-center justify-between mb-4">

        <h2 className="text-2xl font-bold mb-4 text-base-content">
          Visitor List
        </h2>

<div className="flex justify-end mb-3">

  <select
    className="select select-bordered w-30"
    value={typeFilter}
    onChange={(e) => setTypeFilter(e.target.value)}
  >
    <option value="">All Types</option>
    <option value="enquiry">Enquiry</option>
    <option value="training">Training</option>
    <option value="interview">Interview</option>
    <option value="candidate">Candidate</option>
    <option value="client">Client</option>
  </select>

</div>

    </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <div className="overflow-x-auto bg-base-100 border border-base-200 shadow-md rounded-xl">

        <table className="table w-full">

          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredVisitors.length === 0 ? (

              <tr>
                <td colSpan="5" className="text-center py-4">
                  No visitors found
                </td>
              </tr>

            ) : (

              filteredVisitors.map((v) => (

                <tr key={v._id}>

                  <td>{v.fullName}</td>

                  <td className="capitalize">{v.type}</td>

                  <td>{v.email}</td>

                  <td>

                    <span
                      className={`badge ${
                        v.status === "pending"
                          ? "badge-info"
                          : v.status === "approved"
                          ? "badge-success"
                          : v.status === "rejected"
                          ? "badge-error"
                          : "badge-secondary"
                      }`}
                    >
                      {v.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        navigate(`/hr/visitorDetails/${v._id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className={`btn btn-sm ml-1 ${
                        v.type === "interview"
                          ? "btn-primary"
                          : "btn-disabled"
                      }`}
                      disabled={v.type !== "interview"}
                      onClick={() => setSelectedVisitor(v)}
                    >
                      Schedule
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* ================= INTERVIEW MODAL ================= */}

      {selectedVisitor && (

        <InterviewScheduleModal
          selectedVisitor={selectedVisitor}
          employees={employees}
          onClose={() => setSelectedVisitor(null)}
        />

      )}

    </div>
  );
}