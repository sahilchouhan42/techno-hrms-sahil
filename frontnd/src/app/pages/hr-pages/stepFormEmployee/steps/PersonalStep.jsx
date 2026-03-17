import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function PersonalStep() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name*</span>
          </label>
          <input
            type="text"
            {...register('personal.fullName', { required: 'Full name is required' })}
            className="input input-bordered w-full"
          />
          {errors.personal?.fullName && (
            <span className="text-error text-sm mt-1">{errors.personal.fullName.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Father's Name</span>
          </label>
          <input
            type="text"
            {...register('personal.fatherName')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Mother's Name</span>
          </label>
          <input
            type="text"
            {...register('personal.motherName')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select {...register('personal.gender')} className="select select-bordered w-full">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Marital Status</span>
          </label>
          <select {...register('personal.maritalStatus')} className="select select-bordered w-full">
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Date of Birth</span>
          </label>
          <input
            type="date"
            {...register('personal.dob')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Nationality</span>
          </label>
          <input
            type="text"
            {...register('personal.nationality')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <input
            type="text"
            {...register('personal.bloodGroup')}
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* File input for profile photo */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Profile Photo</span>
        </label>
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          {...register('personal.profilePhoto')}
        />
      </div>
    </div>
  );
}