import React from "react";

const JobDeleteModal = ({ deleteJob, setDeleteJob, onDelete }) => {
  if (!deleteJob) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-lg font-semibold mb-3">
          Delete Job
        </h2>

       <p className="text-sm text-gray-600 mb-5">
  Are you sure you want to delete <b>{deleteJob.title}</b> ?
</p>

        <div className="flex justify-end gap-3">

          <button
            className="border px-4 py-2 rounded"
            onClick={() => setDeleteJob(null)}
          >
            Cancel
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => onDelete(deleteJob)}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default JobDeleteModal;