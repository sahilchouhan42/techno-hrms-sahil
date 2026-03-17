import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVisitorById } from "../../../api/visitor-Api";
import { getCandidateInterviewsApi } from "../../../api/interviewApi";

export default function AdminVisitorDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id)
  const [visitor, setVisitor] = useState(null);
  const [interviews, setInterviews] = useState([]);
  //  console.log("interviewRes",interviews)
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const visitorRes = await getVisitorById(id);
      // console.log("visitorRes",visitorRes)
      setVisitor(visitorRes.data);

      const interviewRes = await getCandidateInterviewsApi(id);
      setInterviews(interviewRes.interviews || []);
    } catch {
      alert("Failed to load data");
    }
  };

  if (!visitor) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button className="btn btn-sm mb-6" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="bg-white p-6 rounded shadow space-y-8">
        {/* STEP 1 – PERSONAL DETAILS */}
        <div>
          <h3 className="text-lg font-bold mb-3 border-b pb-2">
            Step 1 – Personal Details
          </h3>

          <p>
            <b>Name:</b> {visitor.fullName}
          </p>
          <p>
            <b>Email:</b> {visitor.email}
          </p>
          <p>
            <b>Phone:</b> {visitor.phone}
          </p>
          <p>
            <b>Status:</b> {visitor.status}
          </p>
        </div>

        {/* STEP 2 – APPLICATION DETAILS */}
        {visitor.type === "interview" && (
          <div>
            <h3 className="text-lg font-bold mb-3 border-b pb-2">
              Step 2 – Application Details
            </h3>

            <p>
              <b>Domain:</b> {visitor.domain}
            </p>
            <p>
              <b>Total Experience:</b> {visitor.totalExperience}
            </p>
            <p>
              <b>Current CTC:</b> {visitor.currentCtc}
            </p>
            <p>
              <b>Expected CTC:</b> {visitor.expectedCtc}
            </p>
            <p>
              <b>Current Organization:</b> {visitor.currentOrganization}
            </p>
          </div>
        )}

        {/* STEP 3+ – INTERVIEW ROUNDS */}
        <div>
          <h3 className="text-lg font-bold mb-3 border-b pb-2">
            Interview Rounds
          </h3>

          {interviews.length === 0 ? (
            <p>No rounds scheduled yet.</p>
          ) : (
            interviews.map((round, index) => (
              <div
                key={round._id}
                className="mb-4 p-4 border rounded bg-gray-50"
              >
                <h4 className="font-semibold">
                  Step {index + 3} – {round.roundType} Round
                </h4>

                <p>
                  <b>Interviewer:</b> {round.interviewer?.name}
                </p>
                <p>
                  <b>Scheduled Date:</b>{" "}
                  {new Date(round.scheduledDate).toLocaleDateString("en-IN")}{" "}
                  {new Date(round.scheduledDate).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                  })}
                </p>

                <p>
                  <b>Status:</b> {round.status}
                </p>

                {round.rating && (
                  <>
                    <p>
                      <b>Rating:</b> {round.rating}/5
                    </p>
                    <p>
                      <b>Feedback:</b> {round.feedback}
                    </p>
                    <p>
                      <b>Recommendation:</b> {round.recommendation}
                    </p>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
