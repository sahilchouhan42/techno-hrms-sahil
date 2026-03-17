import React, { useState } from "react";
import { TfiDownload, TfiCamera, TfiUpload } from "react-icons/tfi";
import { FiEye } from "react-icons/fi";
import { updateEmployeeApi } from "../../../api/employee-Api";

export default function EmployeeModal({ employee, mode, onClose }) {
  const isView = mode === "view";

  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(employee)));
 const [newFiles, setNewFiles] = useState({
    profilePhoto: null,
    aadharCard: null,
    panCard: null,
    resume: null,
    education: null,
    experience: null,
    offerLetter: null,
  });

  // Preview modal state
  const [preview, setPreview] = useState({
    show: false,
    url: "",
    type: "", // "image" or "pdf"
    name: "",
  });

  if (!employee) return null;

  // ---------- Text field handlers ----------
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNestedChange = (path, value) => {
    const parts = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) current[part] = {};
        current = current[part];
      }
      current[parts[parts.length - 1]] = value;
      return newData;
    });
  };

  const handleEmergencyChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        emergencyContact: {
          ...prev.contact?.emergencyContact,
          [field]: value,
        },
      },
    }));
  };

  // ---------- File handlers ----------
  const handleFileChange = (path, file) => {
    setNewFiles((prev) => ({
      ...prev,
      [path]: file,
    }));
  };

  // Trigger file input via hidden element
  const triggerFileInput = (field) => {
    const input = document.getElementById(`file-${field}`);
    if (input) input.click();
  };

  // Build FormData for submission
  const buildFormData = () => {
    const formDataToSend = new FormData();

    const appendNested = (obj, prefix = "") => {
      for (const key in obj) {
        const value = obj[key];
        const fieldName = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value === "object" && !(value instanceof File)) {
          appendNested(value, fieldName);
        } else {
          formDataToSend.append(fieldName, value ?? "");
        }
      }
    };

    appendNested(formData);

    Object.entries(newFiles).forEach(([key, file]) => {
      if (file) {
        if (key === "profilePhoto") {
          formDataToSend.append("personal.profilePhoto", file);
        } else {
          formDataToSend.append(`documents.${key}`, file);
        }
      }
    });

    return formDataToSend;
  };

  const handleUpdate = async () => {
    try {
      const formDataToSend = buildFormData();
      await updateEmployeeApi(employee._id, formDataToSend);
      alert("Employee updated successfully");
      onClose();
    } catch (error) {
      console.error("Update failed", error);
      alert("Update failed. Please try again.");
    }
  };

  // ---------- Preview functions ----------
  const openPreview = (url, name) => {
    // Determine file type from URL or extension
    const ext = url.split('.').pop().toLowerCase();
    const type = (ext === 'pdf') ? 'pdf' : 'image';
    setPreview({ show: true, url, type, name });
  };

  const closePreview = () => {
    setPreview({ show: false, url: "", type: "", name: "" });
  };

  const downloadFile = (url) => {
    window.open(url, "_blank");
  };

  // Helper to format date
  const formatDate = (isoString) => isoString?.split("T")[0] || "";

  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box max-w-5xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">
              {isView ? "Employee Details" : "Edit Employee"}
            </h3>
            <button className="btn btn-sm btn-circle" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Profile Section with overlay upload icon */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative group">
              <div className="avatar">
                <div className="w-20 rounded-full">
                  <img src={formData.personal?.profilePhoto} alt="profile" />
                </div>
              </div>
              {!isView && (
                <>
                  <button
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => triggerFileInput("profilePhoto")}
                    title="Change profile photo"
                  >
                    <TfiCamera className="text-white text-xl" />
                  </button>
                  <input
                    id="file-profilePhoto"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange("profilePhoto", e.target.files[0])}
                  />
                </>
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">
                {formData.personal?.fullName}
              </h2>
              <p className="text-sm opacity-70">
                {formData.account?.officialEmail}
              </p>
              {!isView && newFiles.profilePhoto && (
                <span className="text-xs text-success">New photo selected</span>
              )}
            </div>
          </div>

          {/* PERSONAL, CONTACT, ADDRESS, PROFESSIONAL, ACCOUNT, BANK sections – same as before */}
          {/* (I'll keep them minimal here for brevity; you already have full code) */}
          {/* ... */}
  {/* PERSONAL INFORMATION */}
        <div className="divider">Personal Information</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="text-xs opacity-60">Full Name</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.personal?.fullName || ""}
              onChange={(e) => handleChange("personal", "fullName", e.target.value)}
            />
          </div>
          {/* Father Name */}
          <div>
            <label className="text-xs opacity-60">Father's Name</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.personal?.fatherName || ""}
              onChange={(e) => handleChange("personal", "fatherName", e.target.value)}
            />
          </div>
          {/* Mother Name */}
          <div>
            <label className="text-xs opacity-60">Mother's Name</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.personal?.motherName || ""}
              onChange={(e) => handleChange("personal", "motherName", e.target.value)}
            />
          </div>
          {/* Gender */}
          <div>
            <label className="text-xs opacity-60">Gender</label>
            <select
              className="select select-bordered w-full"
              disabled={isView}
              value={formData.personal?.gender || ""}
              onChange={(e) => handleChange("personal", "gender", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Marital Status */}
          <div>
            <label className="text-xs opacity-60">Marital Status</label>
            <select
              className="select select-bordered w-full"
              disabled={isView}
              value={formData.personal?.maritalStatus || ""}
              onChange={(e) => handleChange("personal", "maritalStatus", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
          {/* Date of Birth */}
          <div>
            <label className="text-xs opacity-60">Date of Birth</label>
            <input
              type="date"
              className="input input-bordered w-full"
              disabled={isView}
              value={formatDate(formData.personal?.dob)}
              onChange={(e) => handleChange("personal", "dob", e.target.value)}
            />
          </div>
          {/* Nationality */}
          <div>
            <label className="text-xs opacity-60">Nationality</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.personal?.nationality || ""}
              onChange={(e) => handleChange("personal", "nationality", e.target.value)}
            />
          </div>
          {/* Blood Group */}
          <div>
            <label className="text-xs opacity-60">Blood Group</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.personal?.bloodGroup || ""}
              onChange={(e) => handleChange("personal", "bloodGroup", e.target.value)}
            />
          </div>
        </div>

        {/* CONTACT DETAILS */}
        <div className="divider">Contact Details</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary Phone */}
          <div>
            <label className="text-xs opacity-60">Primary Phone</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.contact?.primaryPhone || ""}
              onChange={(e) => handleChange("contact", "primaryPhone", e.target.value)}
            />
          </div>
          {/* Alternate Phone */}
          <div>
            <label className="text-xs opacity-60">Alternate Phone</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.contact?.alternatePhone || ""}
              onChange={(e) => handleChange("contact", "alternatePhone", e.target.value)}
            />
          </div>
          {/* Personal Email */}
          <div className="md:col-span-2">
            <label className="text-xs opacity-60">Personal Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.contact?.personalEmail || ""}
              onChange={(e) => handleChange("contact", "personalEmail", e.target.value)}
            />
          </div>

          {/* Emergency Contact */}
          <h5 className="md:col-span-2 font-medium">Emergency Contact</h5>
          <div>
            <label className="text-xs opacity-60">Name</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.contact?.emergencyContact?.name || ""}
              onChange={(e) => handleEmergencyChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Relation</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.contact?.emergencyContact?.relation || ""}
              onChange={(e) => handleEmergencyChange("relation", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Phone</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.contact?.emergencyContact?.phone || ""}
              onChange={(e) => handleEmergencyChange("phone", e.target.value)}
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div className="divider">Address</div>

        {/* Current Address */}
        <h5 className="font-medium mb-2">Current Address</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="text-xs opacity-60">Address</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.address?.current?.address || ""}
              onChange={(e) =>
                handleNestedChange("address.current.address", e.target.value)
              }
            />
          </div>
          <div>
            <label className="text-xs opacity-60">City</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.address?.current?.city || ""}
              onChange={(e) =>
                handleNestedChange("address.current.city", e.target.value)
              }
            />
          </div>
          <div>
            <label className="text-xs opacity-60">State</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.address?.current?.state || ""}
              onChange={(e) =>
                handleNestedChange("address.current.state", e.target.value)
              }
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Country</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.address?.current?.country || ""}
              onChange={(e) =>
                handleNestedChange("address.current.country", e.target.value)
              }
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Pincode</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.address?.current?.pincode || ""}
              onChange={(e) =>
                handleNestedChange("address.current.pincode", e.target.value)
              }
            />
          </div>
        </div>

        {/* Permanent Address */}
        <h5 className="font-medium mb-2">Permanent Address</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs opacity-60">Address</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.address?.permanent?.address || ""}
              onChange={(e) =>
                handleNestedChange("address.permanent.address", e.target.value)
              }
            />
          </div>
          <div>
            <label className="text-xs opacity-60">City</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.address?.permanent?.city || ""}
              onChange={(e) =>
                handleNestedChange("address.permanent.city", e.target.value)
              }
            />
          </div>
          <div>
            <label className="text-xs opacity-60">State</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.address?.permanent?.state || ""}
              onChange={(e) =>
                handleNestedChange("address.permanent.state", e.target.value)
              }
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Country</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.address?.permanent?.country || ""}
              onChange={(e) =>
                handleNestedChange("address.permanent.country", e.target.value)
              }
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Pincode</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.address?.permanent?.pincode || ""}
              onChange={(e) =>
                handleNestedChange("address.permanent.pincode", e.target.value)
              }
            />
          </div>
        </div>

        {/* PROFESSIONAL */}
        <div className="divider">Professional</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Employee ID */}
          <div>
            <label className="text-xs opacity-60">Employee ID</label>
            <input
              className="input input-bordered w-full"
              disabled
              value={formData.professional?.employeeId || ""}
              onChange={(e) => handleChange("professional", "employeeId", e.target.value)}
            />
          </div>
          {/* Department */}
          <div>
            <label className="text-xs opacity-60">Department</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.professional?.department || ""}
              onChange={(e) => handleChange("professional", "department", e.target.value)}
            />
          </div>
          {/* Designation */}
          <div>
            <label className="text-xs opacity-60">Designation</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.professional?.designation || ""}
              onChange={(e) => handleChange("professional", "designation", e.target.value)}
            />
          </div>
          {/* Employment Type */}
          <div>
            <label className="text-xs opacity-60">Employment Type</label>
            <select
              className="select select-bordered w-full"
              disabled={isView}
              value={formData.professional?.employmentType || ""}
              onChange={(e) => handleChange("professional", "employmentType", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          {/* Status */}
          <div>
            <label className="text-xs opacity-60">Status</label>
            <select
              className="select select-bordered w-full"
              disabled={isView}
              value={formData.professional?.status || ""}
              onChange={(e) => handleChange("professional", "status", e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Resigned">Resigned</option>
            </select>
          </div>
          {/* Date of Joining */}
          <div>
            <label className="text-xs opacity-60">Date of Joining</label>
            <input
              type="date"
              className="input input-bordered w-full"
              disabled={isView}
              value={formatDate(formData.professional?.dateOfJoining)}
              onChange={(e) => handleChange("professional", "dateOfJoining", e.target.value)}
            />
          </div>
          {/* Manager ID */}
          <div className="col-span-2">
            <label className="text-xs opacity-60">Manager ID</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.professional?.manager || ""}
              onChange={(e) => handleChange("professional", "manager", e.target.value)}
            />
          </div>
        </div>

        {/* ACCOUNT */}
        <div className="divider">Account</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs opacity-60">Official Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.account?.officialEmail || ""}
              onChange={(e) => handleChange("account", "officialEmail", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.account?.password || ""}
              onChange={(e) => handleChange("account", "password", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Skype ID</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.account?.skypeId || ""}
              onChange={(e) => handleChange("account", "skypeId", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Skype Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.account?.skypePassword || ""}
              onChange={(e) => handleChange("account", "skypePassword", e.target.value)}
            />
          </div>
          {/* Optional fields from defaultValues – you can include if needed */}
          <div>
            <label className="text-xs opacity-60">Personal Email (Account)</label>
            <input
              type="email"
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.account?.personalEmail || ""}
              onChange={(e) => handleChange("account", "personalEmail", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Notes</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.account?.notes || ""}
              onChange={(e) => handleChange("account", "notes", e.target.value)}
            />
          </div>
        </div>

        {/* BANK */}
        <div className="divider">Bank Details</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs opacity-60">Bank Name</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.bank?.bankName || ""}
              onChange={(e) => handleChange("bank", "bankName", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Account Number</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.bank?.accountNumber || ""}
              onChange={(e) => handleChange("bank", "accountNumber", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs opacity-60">IFSC Code</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.bank?.ifscCode || ""}
              onChange={(e) => handleChange("bank", "ifscCode", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs opacity-60">Branch</label>
            <input
              className="input input-bordered w-full"
              disabled={isView}
              value={formData.bank?.branch || ""}
              onChange={(e) => handleChange("bank", "branch", e.target.value)}
            />
          </div>
        </div>
          {/* DOCUMENTS */}
          <div className="divider">Documents</div>
          {isView ? (
            // VIEW MODE: document names with preview and download
            <div className="flex flex-wrap gap-4">
              {Object.entries(employee.documents || {}).map(([key, url]) =>
                url ? (
                  <div key={key} className="flex items-center gap-1 bg-gray-200 rounded-md px-1 pl-2 py-1">
                    <span className="capitalize font-medium">{key}</span>
                    <button
                      className="btn btn-xs btn-ghost btn-circle "
                      onClick={() => openPreview(url, key)}
                      title="Preview"
                    >
                      <FiEye />
                    </button>
                    <button
                      className="btn btn-xs btn-ghost btn-circle"
                      onClick={() => downloadFile(url)}
                      title="Download"
                    >
                      <TfiDownload />
                    </button>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            // EDIT MODE: compact replace icons next to file names
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

  {Object.keys(newFiles).map((docKey) => {

    if (docKey === "profilePhoto") return null;

    const existingUrl = employee.documents?.[docKey];

    return (

      <div
        key={docKey}
        className="flex items-center justify-between gap-2 border border-base-300 rounded-md px-2 py-1 bg-base-200"
      >

        <span className="capitalize text-xs font-medium">
          {docKey}
        </span>

        {existingUrl ? (

          <div className="flex items-center gap-1">

            <a
              href={existingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary text-xs"
            >
              View
            </a>

            <button
              className="btn btn-xs btn-ghost btn-circle h-6 w-6 min-h-0"
              onClick={() => triggerFileInput(docKey)}
              title="Replace"
            >
              <TfiUpload size={12} />
            </button>

          </div>

        ) : (

          <button
            className="btn btn-xs btn-outline btn-primary h-6 min-h-0 px-2"
            onClick={() => triggerFileInput(docKey)}
          >
            Upload
          </button>

        )}

        <input
          id={`file-${docKey}`}
          type="file"
          className="hidden"
          onChange={(e) =>
            handleFileChange(docKey, e.target.files[0])
          }
        />

        {newFiles[docKey] && (
          <span className="text-[10px] text-success">
            ✓
          </span>
        )}

      </div>

    );

  })}

</div>
          )}

          {/* Footer */}
          <div className="modal-action">
            {!isView && (
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            )}
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        <div className="modal-backdrop" onClick={onClose}></div>
      </div>

      {/* Preview Modal */}
      {preview.show && (
        <div className="modal modal-open" onClick={closePreview}>
          <div className="modal-box max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4 capitalize">{preview.name}</h3>
            <div className="max-h-96 overflow-auto">
              {preview.type === "image" ? (
                <img src={preview.url} alt="Preview" className="w-full object-contain" />
              ) : (
                <iframe
                  src={preview.url}
                  title="PDF Preview"
                  className="w-full h-96"
                  frameBorder="0"
                ></iframe>
              )}
            </div>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => downloadFile(preview.url)}
              >
                <TfiDownload className="mr-2" /> Download
              </button>
              <button className="btn" onClick={closePreview}>
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closePreview}></div>
        </div>
      )}
    </>
  );
}