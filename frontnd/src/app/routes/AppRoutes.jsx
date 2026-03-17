import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Layouts
import HRLayout from "../layouts/HRLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";

// HR Pages
import HrDashboard from "../pages/hr-pages/HrDashboard";
import Employees from "../pages/hr-pages/Employees";
import Jobs from "../pages/hr-pages/Jobs";
import Attendance from "../pages/hr-pages/Attendance";
import Performance from "../pages/hr-pages/Performance";
import LeaveManagement from "../pages/hr-pages/LeaveManagement";
import CompanyPolicy from "../pages/hr-pages/CompanyPolicy";
import Settings from "../pages/hr-pages/Settings";

// Employee Pages
import CompanyPolicies from "../pages/employee-pages/CompanyPolicies";
import Payslip from "../pages/employee-pages/PayrollSalary";
import Leave from "../pages/employee-pages/Leave";
import AttendanceEmployee from "../pages/employee-pages/AttendanceEmployee";
import Dashboard from "../pages/employee-pages/Dashboard";
import MyProfile from "../pages/employee-pages/MyProfile";
import Support from "../pages/employee-pages/Support";
import Redirect from "./Redirect";
import NotFound from "../../pages/NotFound";
import AddVisitorPage from "../../pages/AddVisitorPage";
import AdminVisitorsPage from "../pages/hr-pages/AdminVisitorsPage";
import AdminVisitorDetailsPage from "../pages/hr-pages/AdminVisitorDetailsPage";
import PublicJobDetails from "../../pages/PublicJobDetails";
import ApplyJob from "../../pages/ApplyJob";
import ApplicationsPage from "../pages/hr-pages/ApplicationsPage";
import AttendanceDetails from "../pages/hr-pages/AttendanceDetails";
import MainForm from "../pages/hr-pages/stepFormEmployee/MainForm";
import SalaryDashboard from "../pages/hr-pages/Salary/SalaryDashboard";
import Payroll from "../pages/hr-pages/Salary/Payroll";
import ForgotPassword from "../../pages/ForgotPassword";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ROOT REDIRECT */}
      <Route path="/" element={<Redirect />} />

      {/* ===== PUBLIC ROUTES ===== */}
      <Route element={<PublicRoute />}>
        <Route path="/visitorPage" element={<AddVisitorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs/:slug" element={<PublicJobDetails />} />
        <Route path="/apply/:slug" element={<ApplyJob />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* ===== HR PROTECTED ROUTES ===== */}
      <Route element={<ProtectedRoute allowed={["hr"]} />}>
        <Route path="/hr" element={<HRLayout />}>
          <Route index element={<HrDashboard />} />
          <Route path="dashboard" element={<HrDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employees/add/" element={<MainForm />} />
          <Route path="VisitorsPage" element={<AdminVisitorsPage />} />
          <Route
            path="visitorDetails/:id"
            element={<AdminVisitorDetailsPage />}
          />
          <Route path="job-post" element={<Jobs />} />
          <Route path="Applications" element={<ApplicationsPage />} />
          <Route path="salary" element={<SalaryDashboard />} />
            
          <Route path="payroll" element={<Payroll />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendanceDetails/:id" element={<AttendanceDetails />} />
          <Route path="performancee" element={<Performance />} />
          <Route path="leave" element={<LeaveManagement />} />
          <Route path="company-policy" element={<CompanyPolicy />} />
          <Route path="setting" element={<Settings />} />
          <Route path="supportt" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* ===== EMPLOYEE PROTECTED ROUTES ===== */}
      <Route element={<ProtectedRoute allowed={["employee"]} />}>
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Dashboard />} /> {/* /employee */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<AttendanceEmployee />} />
          <Route path="leaveManagement" element={<Leave />} />
          <Route path="payroll-salary" element={<Payslip />} />
          <Route path="myProfile" element={<MyProfile />} />
          <Route path="companyPolicies" element={<CompanyPolicies />} />
          <Route path="support" element={<Support />} />
          {/* use hyphen instead of space */}
        </Route>
      </Route>
    </Routes>
  );
}
