import { useState } from "react";
import { Link } from "react-router-dom";
import { createVisitorApi } from "../api/auth-Api";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import {
  experienceOptions,
  interviewDomains,
  jobSourceOptions,
} from "../data/Dummy-Data";
import { FcGoogle } from "react-icons/fc";

export default function AddVisitorPage() {
  const initialState = {
    type: "enquiry",
    fullName: "",
    phone: "",
    email: "",
    purposeOfVisit: "",
    personToMeet: "",
    visitDate: "",
    checkInTime: "",
    checkOutTime: "",
    remarks: "",
    technology: "",
    domain: "",
    totalExperience: "",
    currentCtc: "",
    expectedCtc: "",
    currentOrganization: "",
    jobSource: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const checkInDateTime =
        form.visitDate && form.checkInTime
          ? new Date(`${form.visitDate}T${form.checkInTime}`).toISOString()
          : null;

      const checkOutDateTime =
        form.visitDate && form.checkOutTime
          ? new Date(`${form.visitDate}T${form.checkOutTime}`).toISOString()
          : null;

      const payload = {
        type: form.type,
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        purposeOfVisit: form.purposeOfVisit,
        personToMeet: form.personToMeet,
        remarks: form.remarks,
        visitDate: form.visitDate
          ? new Date(form.visitDate).toISOString()
          : null,
        checkInTime: checkInDateTime,
        checkOutTime: checkOutDateTime,

        // candidate only
        technology: form.type === "candidate" ? form.technology : null,

        // interview only (NOW STRING BASED)
        domain: form.type === "interview" ? form.domain : null,
        totalExperience:
          form.type === "interview" ? form.totalExperience : null,
        currentCtc: form.type === "interview" ? form.currentCtc : null,
        expectedCtc: form.type === "interview" ? form.expectedCtc : null,
        currentOrganization:
          form.type === "interview" ? form.currentOrganization : null,
        jobSource: form.type === "interview" ? form.jobSource : null,
      };

      await createVisitorApi(payload);

      alert("Visitor Saved Successfully 🎉");
      setForm(initialState);
    } catch (err) {
      alert(
        err?.response?.data?.message || err?.message || "Scheduling failed",
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
      <div className="card w-full max-w-5xl bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">
            Visitor Registration
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visitor Type */}
            <div>
              <label className="label">Visitor Type</label>
              <select
                className="select select-bordered w-full"
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
              >
                <option value="enquiry">Enquiry</option>
                <option value="training">Training</option>
                <option value="interview">Interview</option>
                {/* <option value="candidate">Candidate</option> */}
                <option value="client">Client</option>
              </select>
            </div>

            {/* Candidate Technology */}
            {form.type === "training" && (
              <div>
                <label className="label">Technology</label>
                <select
                  className="select select-bordered w-full"
                  value={form.technology}
                  onChange={(e) => update("technology", e.target.value)}
                  required
                >
                  <option value="">Select Technology</option>
                  <option value="react">React</option>
                  <option value="node">Node.js</option>
                  <option value="mern">MERN Stack</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="devops">DevOps</option>
                </select>
              </div>
            )}

            {/* Interview Fields */}
            {form.type === "interview" && (
              <>
                {/* ✅ Domain */}
                <div className="w-full">
                  <label className="label">Domain</label>
                  <select
                    className="select select-bordered w-full"
                    value={form.domain}
                    onChange={(e) => update("domain", e.target.value)}
                    required
                  >
                    <option value="">Select Domain</option>
                    {interviewDomains.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ✅ Experience Dropdown */}
                <div className="w-full">
                  <label className="label">Total Experience</label>
                  <select
                    className="select select-bordered w-full"
                    value={form.totalExperience}
                    onChange={(e) => update("totalExperience", e.target.value)}
                    required
                  >
                    <option value="">Select Experience</option>
                    {experienceOptions.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ✅ Current CTC */}
                <div className="w-full">
                  <label className="label">Current CTC</label>
                  <input
                    placeholder="e.g. 6 LPA"
                    className="input input-bordered w-full"
                    value={form.currentCtc}
                    onChange={(e) => update("currentCtc", e.target.value)}
                    required
                  />
                </div>

                {/* ✅ Expected CTC */}
                <div className="w-full">
                  <label className="label">Expected CTC</label>
                  <input
                    placeholder="e.g. 9 LPA"
                    className="input input-bordered w-full"
                    value={form.expectedCtc}
                    onChange={(e) => update("expectedCtc", e.target.value)}
                    required
                  />
                </div>

                {/* ✅ Current Organization */}
                <div className="w-full">
                  <label className="label">Current Organization</label>
                  <input
                    className="input input-bordered w-full"
                    value={form.currentOrganization}
                    onChange={(e) =>
                      update("currentOrganization", e.target.value)
                    }
                    required
                  />
                </div>

                {/* ✅ Job Source */}
                <div className="w-full">
                  <label className="label">
                    How did you know about this job?
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={form.jobSource}
                    onChange={(e) => update("jobSource", e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    {jobSourceOptions.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Common Fields (UNCHANGED) */}
            <div>
              <label className="label">Full Name</label>
              <input
                className="input input-bordered w-full"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Phone</label>
              <input
                className="input input-bordered w-full"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Purpose of Visit</label>
              <input
                className="input input-bordered w-full"
                value={form.purposeOfVisit}
                onChange={(e) => update("purposeOfVisit", e.target.value)}
              />
            </div>

            <div>
              <label className="label">Person To Meet</label>
              <input
                className="input input-bordered w-full"
                value={form.personToMeet}
                onChange={(e) => update("personToMeet", e.target.value)}
              />
            </div>

            <div>
              <label className="label">Visit Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={form.visitDate}
                onChange={(e) => update("visitDate", e.target.value)}
              />
            </div>

            <div>
              <label className="label">Check In</label>
              <input
                type="time"
                className="input input-bordered w-full"
                value={form.checkInTime}
                onChange={(e) => update("checkInTime", e.target.value)}
              />
            </div>

            <div>
              <label className="label">Check Out</label>
              <input
                type="time"
                className="input input-bordered w-full"
                value={form.checkOutTime}
                onChange={(e) => update("checkOutTime", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="label">Remarks</label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={3}
                value={form.remarks}
                onChange={(e) => update("remarks", e.target.value)}
              />
            </div>

            {/* Follow Us */}
            <div className="divider">Follow Us</div>
            <div className="flex justify-center gap-6 text-2xl mt-4">
              <a
                href="https://in.linkedin.com/company/technorizen-software-solutions-pvt-ltd"
                target="_blank"
                className="text-blue-700"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://www.instagram.com/technorizen_software_solutions"
                target="_blank"
                className="text-pink-600"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/technorizen/"
                target="_blank"
                className="text-blue-600"
              >
                <FaFacebook />
              </a>
              <a
                href="https://accounts.google.com"
                target="_blank"
                className="text-blue-600"
              >
                <FcGoogle />
              </a>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center">
              <button className={`btn btn-primary w-40 `} type="submit">
                {loading ? "Saving..." : "Submit"}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="text-center mt-6 space-y-3">
            <p className="text-sm text-gray-600">Are you an Employee?</p>

            <Link
              to="/login"
              className="btn btn-outline btn-primary btn-sm px-6"
            >
              Go to Login
            </Link>
            {/* <Link
              to="jobs/:slug"
              className="btn btn-outline btn-primary btn-sm px-6"
            >
              PublicJobDetails
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
