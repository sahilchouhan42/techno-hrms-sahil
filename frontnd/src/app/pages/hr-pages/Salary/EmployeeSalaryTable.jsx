import { useState } from "react";
import { salaryData } from "../../../../data/SallryDummyData";
import SalaryStructureModal from "./SalaryStructureModal";

export default function EmployeeSalaryTable() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="p-0">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary">
              Employee Salary
            </h2>

            <div className="gap-2">

              <button
                className="btn btn-accent btn-sm"
                onClick={() => openModal("setup")}
              >
                Setup employee salary
              </button>

              <button
                className="btn btn-success btn-sm mx-2"
                onClick={() => openModal("payroll")}
              >
                Generate monthly payroll
              </button>

              <button
                className="btn btn-info btn-sm"
                onClick={() => openModal("payslip")}
              >
                Download employee payslips
              </button>

            </div>
          </div>

          {/* TABLE */}
         <div className="overflow-x-auto">
            <table className="table table-zebra table-md">
              <thead className="bg-primary text-white">
                <tr>
                  <th>SN</th>
                  <th>Name</th>
                  <th>Emp Code</th>
                  <th>Working Days</th>
                  <th>CL</th>
                  <th>Week Off</th>
                  <th>Deduction</th>
                  <th>Previous CL</th>
                  <th>Net Salary</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {salaryData.map((emp, index) => (
                  <tr key={emp.id} className="hover">
                    <td className="font-semibold">{index + 1}</td>

                    <td className="font-medium text-base-content">
                      {emp.name}
                    </td>

                    <td>
                      <span className="badge badge-info">{emp.empCode}</span>
                    </td>

                    <td>
                      <span className="badge badge-outline">
                        {emp.workingDays}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-success">{emp.cl}</span>
                    </td>

                    <td>
                      <span className="badge badge-warning">{emp.weekOff}</span>
                    </td>

                    <td>
                      <span className="badge badge-error">
                        {emp.deductionDays}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-accent">
                        {emp.previousCl}
                      </span>
                    </td>

                    <td className="font-bold text-success text-lg">
                      ₹{emp.netSalary}
                    </td>

                    <td className="">
                      <button className="btn btn-xs btn-primary text-blue-600">
                        👁
                      </button>
                      <button className="btn btn-xs btn-secondary text-orange-500 ml-2">
                        ✏
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Setup Salary Modal */}
     {activeModal === "setup" && (
        <SalaryStructureModal onClose={closeModal} />
      )}

      {/* Payroll Modal */}
      {activeModal === "payroll" && (
        <SalaryStructureModal onClose={closeModal} />
      )}

      {/* Payslip Modal */}
      {activeModal === "payslip" && (
        <SalaryStructureModal onClose={closeModal} />
      )}

    </div>
  );
}