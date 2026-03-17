import { useEffect, useState } from "react";
import axios from "axios";

export default function SalaryStructureModal({ onClose }) {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employee: "",
    basicSalary: "",
    hra: "",
    allowance: "",
    bonus: "",
    pf: "",
    tax: "",
  });

  const update = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  /* Fetch employees */
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // const res = await axios.get("/api/employees");
        // setEmployees(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, []);

  /* Convert values to numbers */
  const basic = Number(form.basicSalary) || 0;
  const hra = Number(form.hra) || 0;
  const allowance = Number(form.allowance) || 0;
  const bonus = Number(form.bonus) || 0;
  const pf = Number(form.pf) || 0;
  const tax = Number(form.tax) || 0;

  const grossSalary = basic + hra + allowance + bonus;
  const totalDeduction = pf + tax;
  const netSalary = grossSalary - totalDeduction;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      grossSalary,
      netSalary,
    };

    // await axios.post("/api/salary/structure", payload);

    alert("Salary Structure Saved");

    onClose(); // close modal
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
      <div className="bg-base-100 rounded-xl shadow-2xl w-full max-w-3xl">

        <div className="flex justify-between p-5 border-b">
          <h2 className="text-xl font-bold text-primary">
            Salary Structure
          </h2>

          <button
            className="btn btn-sm btn-circle"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form
          className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >

          {/* Employee Dropdown */}
          <select
            className="select select-bordered"
            value={form.employee}
            onChange={(e) => update("employee", e.target.value)}
            required
          >
            <option value="">Select Employee</option>

            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.personal?.fullName} ({emp.professional?.employeeId})
              </option>
            ))}
          </select>

          <input
            className="input input-bordered"
            placeholder="Basic Salary"
            value={form.basicSalary}
            onChange={(e) => update("basicSalary", e.target.value)}
          />

          <input
            className="input input-bordered"
            placeholder="HRA"
            value={form.hra}
            onChange={(e) => update("hra", e.target.value)}
          />

          <input
            className="input input-bordered"
            placeholder="Allowance"
            value={form.allowance}
            onChange={(e) => update("allowance", e.target.value)}
          />

          <input
            className="input input-bordered"
            placeholder="Bonus"
            value={form.bonus}
            onChange={(e) => update("bonus", e.target.value)}
          />

          <input
            className="input input-bordered"
            placeholder="PF"
            value={form.pf}
            onChange={(e) => update("pf", e.target.value)}
          />

          <input
            className="input input-bordered"
            placeholder="Tax"
            value={form.tax}
            onChange={(e) => update("tax", e.target.value)}
          />

          {/* Salary Preview */}
          <div className="md:col-span-2 bg-base-200 rounded-lg p-4 mt-2">

            <h3 className="font-semibold mb-3 text-primary">
              Salary Preview
            </h3>

            <div className="grid grid-cols-3 gap-4 text-center">

              <div className="bg-success/10 p-3 rounded-lg">
                <p className="text-sm">Gross Salary</p>
                <p className="font-bold text-success text-lg">
                  ₹{grossSalary}
                </p>
              </div>

              <div className="bg-error/10 p-3 rounded-lg">
                <p className="text-sm">Total Deduction</p>
                <p className="font-bold text-error text-lg">
                  ₹{totalDeduction}
                </p>
              </div>

              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-sm">Net Salary</p>
                <p className="font-bold text-primary text-lg">
                  ₹{netSalary}
                </p>
              </div>

            </div>

          </div>

          <div className="md:col-span-2 flex justify-end gap-3">

            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="btn btn-primary">
              Save Salary
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}