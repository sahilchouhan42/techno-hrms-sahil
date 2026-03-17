import React, { useEffect, useState } from "react";
import JobHeader from "../../HR-component/job-Components/JobHeader";
import SharePostModal from "../../HR-component/job-Components/SharePostModal";
import JobCard from "../../HR-component/job-Components/JobCard";
import JobFormModal from "../../HR-component/job-Components/JobFormModal";
import JobDeleteModal from "../../HR-component/job-Components/JobDeleteModel";
import { getAllJobApi, deleteJobApi } from "../../../api/jobApi"; // ✅ added deleteJobApi
import Loader from "../../../components/Loader";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  // States for job form modal (create / view / edit)
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // "create" | "view" | "edit"

  // State for delete confirmation modal
  const [deleteJob, setDeleteJob] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Status filter
  const [filter, setFilter] = useState("open");

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getAllJobApi({ page, limit, status: filter });
      if (res.success) {
        setJobs(res.data);
        setTotalPages(res.totalPages);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, filter]);

  // Handlers
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setModalMode("view");
    setOpenModal(true);
  };

  const handleShareJob = (url) => {
    setShareLink(url);
    setOpenShare(true);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setModalMode("edit");
    setOpenModal(true);
  };

  const handleDelete = async (job) => {
    try {
      await deleteJobApi(job._id);
      await fetchJobs(); // refresh list after delete
      setDeleteJob(null); // close modal
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="space-y-4">
      <JobHeader
        title="Job Post"
        subtitle="Create and manage job openings"
        filter={filter}
        setFilter={(value) => {
          setFilter(value);
          setPage(1);
        }}
        onCreate={() => {
          setSelectedJob(null);
          setModalMode("create");
          setOpenModal(true);
        }}
      />

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader/>
             
      </div>
      ) : jobs.length === 0 ? (
        <p className="text-center text-sm text-gray-400">No jobs found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onView={() => handleViewJob(job)}
                onShare={handleShareJob}
                onEdit={() => handleEdit(job)}
                onDelete={() => setDeleteJob(job)} // ✅ open delete modal instead of direct delete
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-3 pt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-1 text-sm border rounded disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-1 text-sm border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Job Form Modal (Create / View / Edit) */}
      <JobFormModal
        isOpen={openModal}
        mode={modalMode}
        jobData={selectedJob}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          fetchJobs(); // refresh after create/edit
          // setOpenModal(false);
        }}
      />

      {/* Share Post Modal */}
      <SharePostModal
        isOpen={openShare}
        shareUrl={shareLink}
        onClose={() => setOpenShare(false)}
      />

      {/* Delete Confirmation Modal */}
      <JobDeleteModal
        deleteJob={deleteJob}
        setDeleteJob={setDeleteJob}
        onDelete={handleDelete}
      />

      
    </div>
  );
};

export default Jobs;