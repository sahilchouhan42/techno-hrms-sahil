import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ProfessionalStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Professional Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Employee ID</span>
          </label>
          <input
            type="text"
            {...register('professional.employeeId')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Department</span>
          </label>
          <input
            type="text"
            {...register('professional.department')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Designation</span>
          </label>
          <input
            type="text"
            {...register('professional.designation')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Employment Type</span>
          </label>
          <select {...register('professional.employmentType')} className="select select-bordered w-full">
            <option value="">Select</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Intern">Intern</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select {...register('professional.status')} className="select select-bordered w-full">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Resigned">Resigned</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Date of Joining</span>
          </label>
          <input
            type="date"
            {...register('professional.dateOfJoining')}
            className="input input-bordered w-full"
          />
        </div>


<div className="form-control">
          <label className="label">
            <span className="label-text">Week Off</span>
          </label>
          <select {...register('professional.WeekOff')} className="select select-bordered w-full">
            <option value="FIRST_THIRD">FIRST_THIRD</option>
            <option value="SECOND_FOURTH">SECOND_FOURTH</option>
         </select>
        </div>
        {/* <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Manager (ID)</span>
          </label>
          <input
            type="text"
            {...register('professional.manager')}
            className="input input-bordered w-full"
            placeholder="MongoDB ObjectId"
          />
        </div> */}
        
      </div>
    </div>
  );
}