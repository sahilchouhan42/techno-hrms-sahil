import React from 'react'
import AttendanceLog from '../../HR-component/attendenceManegement/AttendanceLog'
import EmployeesLeaveManagement from '../../HR-component/attendenceManegement/EmployeesLeaveManagement'
import CompanyStatsCard from '../../HR-component/attendenceManegement/CompanyStatsCard'

const Attendance = () => {
  return (
    <div>
      {/* <div className='flex mb-4 gap-4 h-60'>
        <CompanyStatsCard/>
        < EmployeesLeaveManagement/>
        
      </div> */}
    
    <AttendanceLog/>
    </div>
  )
}

export default Attendance
