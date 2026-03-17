export default function SummaryStep({ data, setStep }) {

  return (
    <div className="card bg-base-200 p-6">

      <h2 className="text-lg font-semibold mb-4">
        Review Employee Details
      </h2>

      <div className="grid md:grid-cols-2 gap-4 text-sm">

        <div>
          <b>Name:</b> {data.name}
        </div>

        <div>
          <b>Date Of Joining:</b> {data.doj}
        </div>

        <div>
          <b>Date Of Birth:</b> {data.dob}
        </div>

        <div>
          <b>Contact:</b> {data.contact}
        </div>

        <div>
          <b>Alternate No:</b> {data.alternate}
        </div>

        <div>
          <b>Father No:</b> {data.fatherNo}
        </div>

        <div>
          <b>Mother No:</b> {data.motherNo}
        </div>

        <div>
          <b>Emergency:</b> {data.emergency}
        </div>

        <div>
          <b>Current Address:</b> {data.currentAddress}
        </div>

        <div>
          <b>Permanent Address:</b> {data.permanentAddress}
        </div>

        <div>
          <b>Official Email:</b> {data.officialEmail}
        </div>

        <div>
          <b>Skype ID:</b> {data.skypeId}
        </div>

        <div>
          <b>Personal Email:</b> {data.personalEmail}
        </div>

      </div>

      <div className="flex justify-between mt-6">

        <button
          type="button"
          className="btn"
          onClick={() => setStep(4)}
        >
          Back
        </button>

        <button
          type="submit"
          className="btn btn-success"
        >
          Final Submit
        </button>

      </div>

    </div>
  );
}