// import { useEffect, useState } from "react";

// const LeaveTable = () => {
//   const [leaves, setLeaves] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/leaves") // apni API
//       .then(res => res.json())
//       .then(data => setLeaves(data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-sm">
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left">
//           <tbody className="divide-y">
//             {leaves.map((leave) => (
//               <tr key={leave.id} className="hover:bg-gray-50">
                
//                 {/* Checkbox */}
//                 <td className="p-4">
//                   <input type="checkbox" className="accent-gray-700" />
//                 </td>

//                 {/* Profile */}
//                 <td className="p-4 flex items-center gap-3">
//                   <img
//                     src={leave.avatar}
//                     alt={leave.name}
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <p className="font-medium">{leave.name}</p>
//                     <p className="text-xs text-gray-500">
//                       Employee Id - {leave.employeeId}
//                     </p>
//                   </div>
//                 </td>

//                 {/* Leave Type */}
//                 <td className="p-4 text-gray-600">
//                   {leave.leaveType}
//                 </td>

//                 {/* Date */}
//                 <td className="p-4 text-gray-600">
//                   {leave.date}
//                 </td>

//                 {/* Reason */}
//                 <td className="p-4 text-gray-600">
//                   {leave.reason}
//                 </td>

//                 {/* Actions */}
//                 <td className="p-4 flex gap-2">
//                   <button className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
//                     Approve
//                   </button>
//                   <button className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
//                     Reject
//                   </button>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LeaveTable;



import { useEffect, useState } from "react";

const dummyLeaves = [
  {
    id: 1,
    name: "Andrew Charlie",
    employeeId: "Dev258",
    avatar: "https://i.pravatar.cc/40?img=1",
    leaveType: "Casual Leave",
    date: "10/12/2025",
    reason: "Health Issues",
    status: "pending",
  },
  {
    id: 2,
    name: "Priya Sharma",
    employeeId: "Dev112",
    avatar: "https://i.pravatar.cc/40?img=5",
    leaveType: "Sick Leave",
    date: "12/12/2025",
    reason: "Fever",
    status: "pending",
  },
  {
    id: 3,
    name: "Rahul Verma",
    employeeId: "Dev301",
    avatar: "https://i.pravatar.cc/40?img=8",
    leaveType: "Paid Leave",
    date: "15/12/2025",
    reason: "Family Function",
    status: "pending",
  },
];

const LeaveTable = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    setLeaves(dummyLeaves);
  }, []);

  return (
   <div className="w-full p-6 bg-white rounded-xl shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
      
      {/* TABLE HEADER */}
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
        <tr>
          <th className="p-4">
            <input type="checkbox" />
          </th>
          <th className="p-4">Employee</th>
          <th className="p-4">Leave Type</th>
          <th className="p-4">Date</th>
          <th className="p-4">Reason</th>
          <th className="p-4 text-center">Action</th>
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody className="divide-y">
        {leaves.map((leave) => (
          <tr key={leave.id} className="hover:bg-gray-50">

            <td className="p-4">
              <input type="checkbox" className="accent-gray-700" />
            </td>

            <td className="p-4 flex items-center gap-3">
              <img
                src={leave.avatar}
                alt={leave.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{leave.name}</p>
                <p className="text-xs text-gray-500">
                  Employee Id - {leave.employeeId}
                </p>
              </div>
            </td>

            <td className="p-4 text-gray-600">{leave.leaveType}</td>
            <td className="p-4 text-gray-600">{leave.date}</td>
            <td className="p-4 text-gray-600">{leave.reason}</td>

            <td className="p-4 flex justify-center gap-2">
              <button className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                Approve
              </button>
              <button className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
                Reject
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default LeaveTable;
