export default function Payslips() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payslips</h2>

      <div className="card bg-base-100 shadow w-96">
        <div className="card-body">
          <h2 className="card-title">March 2026</h2>
          <p>Net Salary: ₹42000</p>

          <button className="btn btn-outline btn-primary">
            Download Payslip
          </button>
        </div>
      </div>
    </div>
  );
}