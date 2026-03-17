import React, { useEffect, useState } from "react";
import { getAllApplicationsApi, updateApplicationStatusApi } from "../../../api/applicationApi";
import { MdModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Loader from "../../../components/Loader";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("Applied");

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const res = await getAllApplicationsApi({
        status: statusFilter,
      });

      setApplications(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplicationStatusApi(id, { status });
      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Applied":
        return "badge badge-info";
      case "Shortlisted":
        return "badge badge-primary";
      case "Interview":
        return "badge badge-warning";
      case "Rejected":
        return "badge badge-error";
      case "Hired":
        return "badge badge-success";
      default:
        return "badge";
    }
  };

  if (loading) {
    return (
     <div className="flex items-center justify-center min-h-screen">
        {/* <span className="loading loading-spinner loading-lg"></span> */}
        <Loader/>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">Job Applications</h1>
          <p className="text-sm opacity-60">
            Manage candidate applications and update status
          </p>
        </div>

        {/* Status Filter */}
        <select
          className="select select-bordered select-sm w-40"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {/* <option value="All">All</option> */}
          <option value="Applied">All Applications</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Hired">Hired</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-xl border border-base-200">
        <table className="table table-zebra">

          <thead>
            <tr>
              <th>Candidate</th>
              <th>Job</th>
              <th>Experience</th>
              <th>Skills</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>

                {/* Candidate */}
                <td>
                  <div>
                    <p className="font-medium">{app.fullName}</p>
                    <p className="text-xs opacity-60">{app.email}</p>
                    <p className="text-xs opacity-60">{app.phone}</p>
                  </div>
                </td>

                {/* Job */}
                <td>
                  <p className="font-medium">{app.job?.title}</p>
                  <p className="text-xs opacity-60">{app.job?.department}</p>
                </td>

                {/* Experience */}
                <td>{app.totalExperience}</td>

                {/* Skills */}
                <td>
                  <div className="flex flex-wrap gap-1">
                    {app.skills?.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="badge badge-outline badge-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Status */}
                <td>
                  <span className={getStatusBadge(app.status)}>
                    {app.status}
                  </span>
                </td>

                {/* Applied Date */}
                <td>
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="space-x-2">

                  {/* View */}
                  <button className="btn btn-xs btn-outline btn-info">
                  <FaEye />
                  </button>

                  {/* Status Dropdown */}
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-xs btn-outline">
                     <MdModeEdit />
                    </label>

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                    >
                      <li>
                        <a
                          onClick={() =>
                            handleStatusChange(app._id, "Shortlisted")
                          }
                        >
                          Shortlist
                        </a>
                      </li>

                      <li>
                        <a
                          onClick={() =>
                            handleStatusChange(app._id, "Interview")
                          }
                        >
                          Interview
                        </a>
                      </li>

                      <li>
                        <a
                          onClick={() =>
                            handleStatusChange(app._id, "Hired")
                          }
                        >
                          Hired
                        </a>
                      </li>

                      <li>
                        <a
                          onClick={() =>
                            handleStatusChange(app._id, "Rejected")
                          }
                        >
                          Reject
                        </a>
                      </li>
                    </ul>
                  </div>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}