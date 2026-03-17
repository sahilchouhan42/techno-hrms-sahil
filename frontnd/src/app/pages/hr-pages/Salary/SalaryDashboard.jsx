import { Link } from "react-router-dom";
import EmployeeSalaryTable from "./EmployeeSalaryTable";
import SallaryHeader from "./SallaryHeader";

export default function SalaryDashboard() {
  return (
    <div>
     
      <div className="">
        <EmployeeSalaryTable />
      </div>
    </div>
  );
}
