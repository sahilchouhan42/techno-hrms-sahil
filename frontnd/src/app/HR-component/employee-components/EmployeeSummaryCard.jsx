import { Users, ChevronDown } from "lucide-react";

export default function EmployeeSummaryCard({ employees }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* CARD 1 */}
      <div className="card shadow-sm border border-base-200">
        <div className="card-body p-4">

          {/* Top Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg  text-primary">
              <Users size={18} />
            </div>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-xs">
                This Week
                <ChevronDown size={14} />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
              >
                <li><a>This Week</a></li>
                <li><a>This Month</a></li>
                <li><a>This Year</a></li>
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center md:text-left">
            <div>
              <p className="text-xs opacity-60">All Employees</p>
              <p className="text-lg font-semibold">{employees.length}</p>
            </div>
            <div>
              <p className="text-xs opacity-60">Active</p>
              <p className="text-lg font-semibold text-success">
                {employees.filter((emp) => emp.isActive).length}
              </p>
            </div>
            <div>
              <p className="text-xs opacity-60">Inactive</p>
              <p className="text-lg font-semibold text-error">
                {employees.filter((emp) => !emp.isActive).length}
              </p>
            </div>
          </div>

        </div>
      </div>


      {/* CARD 2 */}
      <div className="card  shadow-sm border border-base-200">
        <div className="card-body p-4">

          {/* Top Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary/20 text-secondary">
              <Users size={18} />
            </div>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-xs">
                This Week
                <ChevronDown size={14} />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
              >
                <li><a>This Week</a></li>
                <li><a>This Month</a></li>
                <li><a>This Year</a></li>
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center md:text-left">
            <div>
              <p className="text-xs opacity-60">New Employees</p>
              <p className="text-lg font-semibold">12</p>
            </div>
            <div>
              <p className="text-xs opacity-60">Departments</p>
              <p className="text-lg font-semibold">3</p>
            </div>
            <div>
              <p className="text-xs opacity-60">On Leave</p>
              <p className="text-lg font-semibold text-warning">7</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}