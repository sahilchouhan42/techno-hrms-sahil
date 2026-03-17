import { useState } from "react";

const UploadPolicyModal = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("policy", file);

    try {
      setLoading(true);
      await fetch("http://localhost:5000/api/policies/upload", {
        method: "POST",
        body: formData,
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"  >
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-center mb-2">
          Add Policy
        </h3>

        <p className="text-xs text-gray-500 text-center mb-6">
          Upload company policy PDF
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border rounded-md p-2 mb-4"
        />

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-gradient-to-r from-slate-900 to-sky-500 text-white px-6 py-2 rounded-md"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPolicyModal;
