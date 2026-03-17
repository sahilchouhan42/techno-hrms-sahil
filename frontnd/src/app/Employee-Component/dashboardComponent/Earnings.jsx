import React from "react";
import { FaMoneyBillWave, FaCreditCard, FaRupeeSign } from "react-icons/fa";

const Earnings = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold">Earnings</h3>
        <span className="text-sm text-blue-500 cursor-pointer">
          August
        </span>
      </div>

      {/* CONTENT */}
      <div className="space-y-6">
        <EarningRow
          icon={<FaMoneyBillWave size={22} className="text-blue-600" />}
          label="Total Salary"
          value="30,000 Rs"
        />

        <EarningRow
          icon={<FaCreditCard size={22} className="text-indigo-600" />}
          label="Basic Salary"
          value="27,000 Rs"
        />

        <EarningRow
          icon={<FaRupeeSign size={22} className="text-purple-600" />}
          label="Deduction"
          value="3,000 Rs"
        />
      </div>
    </div>
  );
};

export default Earnings;

/* ================= SMALL COMPONENT ================= */

function EarningRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      {/* ICON */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100">
        {icon}
      </div>

      {/* TEXT */}
      <div>
        <p className="text-sm text-gray-500">
          {label} :
        </p>
        <p className="text-xl font-semibold text-gray-700">
          {value}
        </p>
      </div>
    </div>
  );
}
