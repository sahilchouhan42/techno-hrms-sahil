import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function ContactStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Primary Phone</span>
          </label>
          <input
            type="tel"
            {...register('contact.primaryPhone')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Alternate Phone</span>
          </label>
          <input
            type="tel"
            {...register('contact.alternatePhone')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Personal Email</span>
          </label>
          <input
            type="email"
            {...register('contact.personalEmail')}
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-4">Emergency Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register('contact.emergencyContact.name')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Relation</span>
          </label>
          <input
            type="text"
            {...register('contact.emergencyContact.relation')}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="tel"
            {...register('contact.emergencyContact.phone')}
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </div>
  );
}