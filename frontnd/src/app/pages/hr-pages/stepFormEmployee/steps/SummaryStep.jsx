import React from "react";
import { useFormContext } from "react-hook-form";

export default function SummaryStep() {

  const { getValues } = useFormContext();

  const data = getValues();

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">Summary</h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Personal */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Personal</h3>
          <p>Name: {data.personal?.fullName}</p>
          <p>Father: {data.personal?.fatherName}</p>
          <p>Gender: {data.personal?.gender}</p>
          <p>DOB: {data.personal?.dob}</p>
        </div>

        {/* Contact */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Phone: {data.contact?.primaryPhone}</p>
          <p>Email: {data.contact?.personalEmail}</p>
        </div>

        {/* Address */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Address</h3>
          <p>City: {data.address?.current?.city}</p>
          <p>State: {data.address?.current?.state}</p>
        </div>

        {/* Professional */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Professional</h3>
          <p>Department: {data.professional?.department}</p>
          <p>Designation: {data.professional?.designation}</p>
        </div>

        {/* Account */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Account</h3>
          <p>Email: {data.account?.officialEmail}</p>
          <p>Skype: {data.account?.skypeId}</p>
        </div>

        {/* Bank */}
        <div className="card bg-base-200 p-4">
          <h3 className="font-semibold mb-2">Bank</h3>
          <p>Bank: {data.bank?.bankName}</p>
          <p>Account: {data.bank?.accountNumber}</p>
        </div>

      </div>

    </div>
  );
}