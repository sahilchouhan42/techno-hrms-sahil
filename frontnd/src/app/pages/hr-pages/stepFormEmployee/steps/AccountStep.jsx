import React from "react";
import { useFormContext } from "react-hook-form";

export default function AccountStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Account Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Row 1 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Official Email</span>
          </label>
          <input
            type="email"
            {...register("accounts.officialEmail")}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Official Password</span>
          </label>
          <input
            type="password"
            {...register("accounts.officialPassword")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Row 2 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Skype ID</span>
          </label>
          <input
            type="text"
            {...register("accounts.skypeId")}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Skype Password</span>
          </label>
          <input
            type="password"
            {...register("accounts.skypePassword")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Row 3 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Personal Email</span>
          </label>
          <input
            type="email"
            {...register("accounts.personalEmail")}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Account Notes (Optional)</span>
          </label>
          <input
            type="text"
            {...register("accounts.notes")}
            className="input input-bordered w-full"
          />
        </div>

      </div>
    </div>
  );
}