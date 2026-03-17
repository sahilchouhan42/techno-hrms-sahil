import { useState } from "react";

export default function AccountsStep({ register, setStep }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showSkypePassword, setShowSkypePassword] = useState(false);

  return (
    <div className="card bg-base-200 p-6">
      <h2 className="font-semibold text-lg mb-6">Accounts Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Official Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Official Email</span>
          </label>
          <input
            id="officialEmail"
            className="input input-bordered"
            placeholder="Enter official email"
            {...register("accounts.officialEmail")}
          />
        </div>

        {/* Official Password */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Official Email Password</span>
          </label>

          <input
            id="officialPassword"
            type={showPassword ? "text" : "password"}
            className="input input-bordered w-full"
            placeholder="Enter official email password"
            {...register("accounts.officialPassword")}
          />

          <button
            type="button"
            className="absolute right-3 top-[42px]"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </button>
        </div>

        {/* Skype ID */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Skype / Teams ID</span>
          </label>
          <input
            id="skypeId"
            className="input input-bordered"
            placeholder="Enter Skype or Teams ID"
            {...register("accounts.skypeId")}
          />
        </div>

        {/* Skype Password */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Skype / Teams Password</span>
          </label>

          <input
            id="skypePassword"
            type={showSkypePassword ? "text" : "password"}
            className="input input-bordered w-full"
            placeholder="Enter Skype password"
            {...register("accounts.skypePassword")}
          />

          <button
            type="button"
            className="absolute right-3 top-[42px]"
            onClick={() => setShowSkypePassword(!showSkypePassword)}
          >
            👁
          </button>
        </div>

        {/* Personal Email */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Personal Email</span>
          </label>
          <input
            id="personalEmail"
            className="input input-bordered"
            placeholder="Enter personal email"
            {...register("accounts.personalEmail")}
          />
        </div>

      </div>

      <div className="flex justify-between mt-6">
        <button type="button" className="btn" onClick={() => setStep(2)}>
          Back
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep(4)}
        >
          Next
        </button>
      </div>
    </div>
  );
}