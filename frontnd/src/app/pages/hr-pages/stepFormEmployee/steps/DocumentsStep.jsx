import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function DocumentsStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Documents</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Aadhar Card</span>
          </label>
          <input
            type="file"
            {...register('documents.aadharCard')}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">PAN Card</span>
          </label>
          <input
            type="file"
            {...register('documents.panCard')}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Resume</span>
          </label>
          <input
            type="file"
            {...register('documents.resume')}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Education Certificates</span>
          </label>
          <input
            type="file"
            {...register('documents.education')}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Experience Letters</span>
          </label>
          <input
            type="file"
            {...register('documents.experience')}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Offer Letter</span>
          </label>
          <input
            type="file"
            {...register('documents.offerLetter')}
            className="file-input file-input-bordered w-full"
          />
        </div>
      </div>
    </div>
  );
}