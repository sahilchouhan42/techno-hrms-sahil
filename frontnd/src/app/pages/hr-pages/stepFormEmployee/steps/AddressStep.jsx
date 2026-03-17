import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function AddressStep() {
  const { register, setValue, control } = useFormContext();

  // Watch the "same as current" checkbox and current address fields
  const sameAsCurrent = useWatch({ name: 'address.sameAsCurrent', control });
  const currentAddress = useWatch({ name: 'address.current', control });

  useEffect(() => {
    if (sameAsCurrent) {
      // Copy all current address fields to permanent
      setValue('address.permanent.address', currentAddress.address || '');
      setValue('address.permanent.city', currentAddress.city || '');
      setValue('address.permanent.state', currentAddress.state || '');
      setValue('address.permanent.country', currentAddress.country || '');
      setValue('address.permanent.pincode', currentAddress.pincode || '');
    }
  }, [sameAsCurrent, currentAddress, setValue]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Address Information</h2>

      {/* Current Address */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Current Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              {...register('address.current.address')}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              {...register('address.current.city')}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">State</span>
            </label>
            <input
              type="text"
              {...register('address.current.state')}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              type="text"
              {...register('address.current.country')}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pincode</span>
            </label>
            <input
              type="text"
              {...register('address.current.pincode')}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>

      {/* Same as current checkbox */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            {...register('address.sameAsCurrent')}
            className="checkbox checkbox-primary"
          />
          <span className="label-text">Permanent address same as current address</span>
        </label>
      </div>

      {/* Permanent Address */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Permanent Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              {...register('address.permanent.address')}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              {...register('address.permanent.city')}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">State</span>
            </label>
            <input
              type="text"
              {...register('address.permanent.state')}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              type="text"
              {...register('address.permanent.country')}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pincode</span>
            </label>
            <input
              type="text"
              {...register('address.permanent.pincode')}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}