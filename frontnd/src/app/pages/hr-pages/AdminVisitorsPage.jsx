import React, { useEffect, useState, useMemo } from "react";
import { getALLVisitorApi, updateVisitorStatusApi } from "../../../api/visitor-Api";
import { useNavigate } from "react-router-dom";
import InterviewScheduleModal from './../../HR-component/model/InterviewScheduleModal';
import Loader from "../../../components/Loader";
import { getAllEmployeesApi } from "../../../api/employee-Api";

export default function AdminVisitorsPage() {
  const [actionLoading, setActionLoading] = useState(null);
  const [search, setSearch] = useState("");
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


  //new-update = resuable status badge logic 
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "badge-info";
      case "approved":
        return "badge-success";
      case "rejected":
        return "badge-error";
      default:
        return "badge-secondary";
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

  
  const filteredVisitors = useMemo(() => {
  return visitors.filter((v) => {
    return (
      (!typeFilter || v.type === typeFilter) &&
      v.fullName?.toLowerCase().includes(search.toLowerCase())
      
    );
  });
}, [visitors, typeFilter, search]);

  useEffect(() => {
    setError("")
    fetchVisitors();
    fetchEmployees();
  }, []);

  /* ================= LOADER UI ================= */
  if (visitorsLoading || employeesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }


  // const filteredVisitors = typeFilter
  //   ? visitors.filter((v) => v.type === typeFilter)
  //   : visitors;

  const handleApprove = async (id) => {
  try {

    await updateVisitorStatusApi(id, { status: "approved" });
    setVisitors((prev) =>
      prev.map((v) =>
        v._id === id ? { ...v, status: "approved" } : v
      )
    );
  } catch (err) {
    console.log(err);
  }
};

const handleReject = async (id) => {
  try {
     await updateVisitorStatusApi(id, { status: "rejected" });
    setVisitors((prev) =>
      prev.map((v) =>
        v._id === id ? { ...v, status: "rejected" } : v
      )
    );
  } catch (err) {
    console.log(err);
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    setVisitors((prev) =>
      prev.filter((v) => v._id !== id)
    );
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="p-4 min-h-screen">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-2xl font-bold mb-4 text-base-content">
          Visitor List
        </h2>
{/* 
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

        </div> */}

        <div className="flex items-center gap-2 mb-3">

  {/* search input */}
  <input
    type="text"
    placeholder="Search by name..."
    className="input input-bordered w-52"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {/*  filter dropdown */}
  <select
    className="select select-bordered w-40"
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
                    {/* 
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
                    </span> */}

                    
                    <span className={`badge ${getStatusClass(v.status)}`}>
                      {v.status}
                    </span>

                  </td>

                  {/* <td>

                    <button
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        navigate(`/hr/visitorDetails/${v._id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className={`btn btn-sm ml-1 ${v.type === "interview"
                          ? "btn-primary"
                          : "btn-disabled"
                        }`}
                      disabled={v.type !== "interview"}
                      onClick={() => setSelectedVisitor(v)}
                    >
                      Schedule
                    </button>

                  </td> */}

                  <td className="flex gap-1">

  {/* 👁 VIEW */}
  <button
    className="btn btn-xs btn-info"
    onClick={() => navigate(`/hr/visitorDetails/${v._id}`)}
  >
    View
  </button>

  {/* ✅ APPROVE */}
  {v.status === "pending" && (
    <button
      className="btn btn-xs btn-success"
      disabled={actionLoading === v._id}
      onClick={async () => {
        setActionLoading(v._id);
        await handleApprove(v._id);
        setActionLoading(null);
      }}
    >
      {actionLoading === v._id ? "..." : "Approve"}
    </button>
  )}

  {/* ❌ REJECT */}
  {v.status === "pending" && (
    <button
      className="btn btn-xs btn-error"
      disabled={actionLoading === v._id}
      onClick={async () => {
        setActionLoading(v._id);
        await handleReject(v._id);
        setActionLoading(null);
      }}
    >
      {actionLoading === v._id ? "..." : "Reject"}
    </button>
  )}

  {/* 🗑 DELETE */}
  <button
    className="btn btn-xs btn-outline"
    disabled={actionLoading === v._id}
    onClick={async () => {
      setActionLoading(v._id);
      await handleDelete(v._id);
      setActionLoading(null);
    }}
  >
    {actionLoading === v._id ? "..." : "Delete"}
  </button>

  <button
  className={`btn btn-sm ml-1 ${
    v.type === "interview" && v.status === "approved" ? "btn-primary" : "btn-disabled"
  }`}
  disabled={!(v.type === "interview" && v.status === "approved")}
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