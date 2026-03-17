import React from "react";
import { Link } from "react-router-dom";

const SallaryHeader = () => {
  return (
    <div className="p-6">

      {/* Heading Right Side */}
      <div className="mb-3">
        <h2 className="text-2xl font-bold text-primary">
          Employee Salary
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* Salary Structure */}
        <Link to="/hr/salary/structure" className="block">
          <div className="card bg-base-100 shadow hover:shadow-xl transition cursor-pointer">
            <div className="card-body bg-[#0aa2df] rounded-xl">
              <h2 className="card-title">Salary Structure</h2>
              <p>Setup employee salary</p>
            </div>
          </div>
        </Link>

        {/* Payroll */}
        <Link to="/hr/salary/payroll" className="block">
          <div className="card bg-base-100 shadow hover:shadow-xl transition cursor-pointer">
            <div className="card-body bg-emerald-400 rounded-xl">
              <h2 className="card-title">Payroll</h2>
              <p>Generate monthly payroll</p>
            </div>
          </div>
        </Link>

        {/* Payslips */}
        <Link to="/hr/salary/payslips" className="block">
          <div className="card bg-base-100 shadow hover:shadow-xl transition cursor-pointer">
            <div className="card-body bg-sky-400 rounded-xl">
              <h2 className="card-title">Payslips</h2>
              <p>Download employee payslips</p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default SallaryHeader;