import {
  LayoutGrid,
  User,
  CalendarCheck,
  Calendar,
  Wallet,
  Briefcase,
  Target,
  Banknote ,
  Users,
  BarChart2,
  ShieldCheck,
  Settings,
} from "lucide-react";

export const menu = {
  hr: [
    { name: "Dashboard", icon: LayoutGrid, path: "" }, // index route
    { name: "Employees", icon: Users, path: "employees" },
     { name: "Visitors", icon: Users, path: "VisitorsPage" },
    { name: "Job Post", icon: Briefcase, path: "job-post" },
    { name: "Applications", icon: Target, path: "Applications" },
    { name: "Salary", icon: Banknote, path: "salary" },
    { name: "Attendance Management", icon: CalendarCheck, path: "attendance" },
    { name: "Performance Management", icon: BarChart2, path: "performance" },
    { name: "Leave Management", icon: Calendar, path: "leave" },
    { name: "Company Policy", icon: ShieldCheck, path: "company-policy" },
    { name: "Setting", icon: Settings, path: "settings" },
  ],

  employee: [
    { name: "Dashboard", icon: LayoutGrid, path: "" }, // index route
    { name: "My Profile", icon: User, path: "myProfile" },
    { name: "Attendance", icon: CalendarCheck, path: "attendance" },
    { name: "Leave Management", icon: Calendar, path: "leaveManagement" },
    { name: "Payroll & Salary", icon: Wallet, path: "payroll-salary" }, // avoid & in URL
    { name: "Company Policies", icon: Briefcase, path: "companyPolicies" },
  ],
};

 export const experienceOptions = [
    "Less than 1 year",
    "1-2 years",
    "2-3 years",
    "3-4 years",
    "4-5 years",
    "5-6 years",
    "6-7 years",
    "7-8 years",
    "8-9 years",
    "9-10 years",
    "10+ years",
  ];

  export const interviewDomains = [
    "MERN",
    "React",
    "Node.js",
    "Java",
    "Python",
    "DevOps",
    "UI/UX",
    "QA",
    "Data Science",
    "Flutter",
    "Android",
    "iOS",
  ];

  export const jobSourceOptions = [
    "LinkedIn",
    "Naukri",
    "Indeed",
    "Reference",
    "Company Website",
    "Other",
  ];

export const fetchAttendance = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Andrew Charlie",
          role: "UI/UX Designer",
          date: "Dec 29, 2024",
          clockIn: "09:02 AM",
          clockOut: "07:00 PM",
          hours: "8 hour",
          department: "UI/UX Designer",
          status: "Present",
          avatar: "https://i.pravatar.cc/40?img=12",
        },
        {
          id: 2,
          name: "Aarav Mehta",
          role: "S/W Developer",
          date: "Dec 29, 2024",
          clockIn: "-",
          clockOut: "-",
          hours: "0",
          department: "S/W Developer",
          status: "Absent",
          avatar: "https://i.pravatar.cc/40?img=32",
        },
        {
          id: 3,
          name: "Andrew Charlie",
          role: "UI/UX Designer",
          date: "Dec 29, 2024",
          clockIn: "09:30 AM",
          clockOut: "07:45 PM",
          hours: "17h 39m",
          department: "UI/UX Designer",
          status: "Present",
          avatar: "https://i.pravatar.cc/40?img=14",
        },
        {
          id: 4,
          name: "Andrew Charlie",
          role: "S/W Developer",
          date: "Dec 29, 2024",
          clockIn: "10:30 AM",
          clockOut: "07:10 PM",
          hours: "17h 39m",
          department: "S/W Developer",
          status: "Present",
          avatar: "https://i.pravatar.cc/40?img=18",
        },
      ]);
    }, 800);
  });
};


// -------calender data------///

export const fetchLeaveCalendarData = () => {
  return Promise.resolve([
    {
      employeeId: 1,
      employeeName: "Rahul Sharma",
      status: "Approved",
      leaveDates: ["2026-02-10", "2026-02-11", "2026-02-12"],
    },
    {
      employeeId: 2,
      employeeName: "Priya Verma",
      status: "Pending",
      leaveDates: ["2026-02-15", "2026-02-16"],
    },
    {
      employeeId: 3,
      employeeName: "Amit Singh",
      status: "Rejected",
      leaveDates: ["2026-02-18"],
    },
    {
      employeeId: 4,
      employeeName: "Neha Gupta",
      status: "Approved",
      leaveDates: ["2026-02-20", "2026-02-21"],
    },
  ]);
};

// -------dummyJobs data------///

export const dummyJobs = [
  {
    _id: "1",
    jobTitle: "UI/UX Designer",
    description:
      "A UI/UX Designer is responsible for designing the overall look, feel, and usability of digital products.",
    activeUntil: "Jan 31, 2025",
    department: "Design",
    jobType: "Full Time",
    location: "Onsite",
    status: "Active",
  },
  {
    _id: "2",
    jobTitle: "Frontend Developer",
    description:
      "Frontend developers build user interfaces using modern frameworks and tools.",
    activeUntil: "Jan 31, 2025",
    department: "Development",
    jobType: "Full Time",
    location: "Onsite",
    status: "Active",
  },
  {
    _id: "3",
    jobTitle: "Backend Developer",
    description:
      "Backend developers manage databases, APIs, and server-side logic.",
    activeUntil: "Jan 31, 2025",
    department: "Development",
    jobType: "Contract",
    location: "Remote",
    status: "Inactive",
  },
];


export const employees = [
  {
    id: 1,
    name: "Arjun Sharma",
    email: "arjun@company.com",
    department: "HR",
    role: "HR Manager",
    roleClass: "badge-primary",
    status: "Active",
    joinDate: "12 Jan 2023",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@company.com",
    department: "IT",
    role: "Frontend Developer",
    roleClass: "badge-secondary",
    status: "Active",
    joinDate: "05 Mar 2022",
  },
  {
    id: 3,
    name: "Rahul Singh",
    email: "rahul@company.com",
    department: "Finance",
    role: "Accountant",
    roleClass: "badge-accent",
    status: "Active",
    joinDate: "20 Jul 2021",
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha@company.com",
    department: "IT",
    role: "Backend Developer",
    roleClass: "badge-info",
    status: "Active",
    joinDate: "18 Sep 2023",
  },
  {
    id: 5,
    name: "Vikram Rao",
    email: "vikram@company.com",
    department: "Operations",
    role: "Operations Lead",
    roleClass: "badge-warning",
    status: "Active",
    joinDate: "10 Feb 2020",
  },
];

export const attendanceData = [
  { id: 1, name: "Arjun Sharma", department: "HR", status: "Present" },
  { id: 2, name: "Priya Verma", department: "IT", status: "Present" },
  { id: 3, name: "Rahul Singh", department: "Finance", status: "Absent" },
  { id: 4, name: "Sneha Patel", department: "IT", status: "Present" },
  { id: 5, name: "Vikram Rao", department: "Operations", status: "Absent" },
  { id: 6, name: "Neha Kapoor", department: "HR", status: "Present" },
];