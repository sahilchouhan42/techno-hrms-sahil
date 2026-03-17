import React from 'react'
import LeaveCalendar from '../../HR-component/leaveComponent/LeaveCalendar'
import LeaveTable from '../../HR-component/leaveComponent/LeaveTable'

const LeaveManagement = () => {
  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <LeaveCalendar />
      <LeaveTable />
    </div>
  )
}

export default LeaveManagement
