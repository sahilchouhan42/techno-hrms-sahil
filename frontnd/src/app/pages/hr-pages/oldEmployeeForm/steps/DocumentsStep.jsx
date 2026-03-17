export default function DocumentsStep({ register, setStep }) {

  return (
    <div className="card bg-base-200 p-6">

      <h2 className="text-lg font-semibold mb-4">
        Employee Documents
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Aadhar */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Aadhar Card</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("aadharCard")}
          />
        </div>

        {/* PAN */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">PAN Card</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("panCard")}
          />
        </div>

        {/* Resume */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Resume</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("resume")}
          />
        </div>

        {/* Education */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Education Certificate</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("education")}
          />
        </div>

        {/* Experience */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Experience Letter</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("experience")}
          />
        </div>

        {/* Offer Letter */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Offer Letter</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("offerLetter")}
          />
        </div>

      </div>

      {/* Navigation Buttons */}

      <div className="flex justify-between mt-6">

        <button
          type="button"
          className="btn"
          onClick={() => setStep(3)}
        >
          Back
        </button>

      
<button
  type="submit"
  className="btn btn-primary"
  onClick={() => setStep(5)}
>
  Submit Employee
</button>
      </div>

    </div>
  );
}