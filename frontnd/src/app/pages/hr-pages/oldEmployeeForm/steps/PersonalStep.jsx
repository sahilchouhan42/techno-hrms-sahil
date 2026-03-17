export default function PersonalStep({ register, setStep }) {
  return (
    <div className="card bg-base-200 p-6">

      <h2 className="font-semibold text-lg mb-4">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <div className="form-control">
          <label className="label">
            <span className="label-text">Employee Name</span>
          </label>
          <input
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Date Of Joining</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("doj")}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Date Of Birth</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("dob")}
          />
        </div>

      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep(2)}
        >
          Next
        </button>
      </div>

    </div>
  );
}