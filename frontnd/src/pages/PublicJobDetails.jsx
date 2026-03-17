import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobBySlug } from "../api/jobApi";

const PublicJobDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await getJobBySlug(slug);

        if (res.success && res.data) {
          setJob(res.data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [slug]);

  // 🔥 Loading Spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 🔥 Not Found UI
  if (notFound || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-4">
        <div className="card bg-base-100 shadow-xl p-8">
          <h2 className="text-2xl font-bold text-error">No Job Found</h2>
          <p className="text-gray-500 mt-2">
            The job you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary mt-4"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Company Header */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body flex flex-col md:flex-row items-center gap-0 sm:gap-6 ">
            <img
              src="https://images.jdmagicbox.com/comp/indore/y7/0731px731.x731.160707160502.g5y7/catalogue/technorizen-software-solutions-pvt-ltd-sapna-sangeeta-road-indore-internet-website-designers-hhlru1nigv.jpg"
              alt="Company Logo"
              className="w-24 rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {job.title}
              </h1>
              <p className="text-lg text-gray-500">
                {job.companyName} • {job.location}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="badge badge-primary">
                  {job.department}
                </span>
                <span className="badge badge-secondary">
                  {job.employmentType}
                </span>
                <span className="badge badge-accent">
                  {job.workplaceType}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-primary">Job Overview</h2>
            <p className="text-gray-600">{job.overview}</p>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-primary">Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {job.responsibilities?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-primary">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills?.map((skill, index) => (
                <span key={index} className="badge badge-outline">
                  {skill}
                </span>
              ))}
            </div>

            <h2 className="card-title text-secondary mt-4">
              Good To Have
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.goodToHaveSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-outline badge-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Salary & Experience */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-primary">Experience</h3>
              <p>{job.experienceMin} - {job.experienceMax} Years</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary">Salary</h3>
              <p>
                ₹{job.salaryMin?.toLocaleString()} - ₹{job.salaryMax?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-primary">Benefits</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {job.benefits?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Apply Button */}
        <div className="text-center pt-6">
          <button
            onClick={() => navigate(`/apply/${job.slug}`)}
            className="btn btn-primary btn-lg px-10"
          >
            Apply Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default PublicJobDetails;