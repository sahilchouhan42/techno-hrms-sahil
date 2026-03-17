export default function ContactStep({
  register,
  setStep,
  copyAddress
}) {

  return (
    <div className="card bg-base-200 p-6">

      <h2 className="font-semibold text-lg mb-4">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Contact No */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Contact Number</span>
          </label>
          <input
            id="contact"
            className="input input-bordered"
            placeholder="Enter contact number"
            {...register("contact")}
          />
        </div>

        {/* Alternate No */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Alternate Number</span>
          </label>
          <input
            id="alternate"
            className="input input-bordered"
            placeholder="Enter alternate number"
            {...register("alternate")}
          />
        </div>

        {/* Father No */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Father's Contact</span>
          </label>
          <input
            id="fatherNo"
            className="input input-bordered"
            placeholder="Enter father's contact number"
            {...register("fatherNo")}
          />
        </div>

        {/* Mother No */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mother's Contact</span>
          </label>
          <input
            id="motherNo"
            className="input input-bordered"
            placeholder="Enter mother's contact number"
            {...register("motherNo")}
          />
        </div>

        {/* Emergency No */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Emergency Contact</span>
          </label>
          <input
            id="emergency"
            className="input input-bordered"
            placeholder="Enter emergency contact"
            {...register("emergency")}
          />
        </div>

        {/* Landline */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Landline Number</span>
          </label>
          <input
            id="landline"
            className="input input-bordered"
            placeholder="Enter landline number"
            {...register("landline")}
          />
        </div>

      </div>

      {/* Address Section */}
      <div className="mt-6 space-y-3">

        <div className="form-control">
          <label className="label">
            <span className="label-text">Current Address</span>
          </label>
          <textarea
            id="currentAddress"
            className="textarea textarea-bordered w-full"
            placeholder="Enter current address"
            {...register("currentAddress")}
          />
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" onChange={copyAddress} />
          Same as Current Address
        </label>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Permanent Address</span>
          </label>
          <textarea
            id="permanentAddress"
            className="textarea textarea-bordered w-full"
            placeholder="Enter permanent address"
            {...register("permanentAddress")}
          />
        </div>

      </div>

      <div className="flex justify-between mt-6">

        <button
          type="button"
          className="btn"
          onClick={() => setStep(1)}
        >
          Back
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep(3)}
        >
          Next
        </button>

      </div>

    </div>
  );
}