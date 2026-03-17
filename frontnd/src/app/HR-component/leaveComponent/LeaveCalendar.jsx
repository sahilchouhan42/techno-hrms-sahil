import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { fetchLeaveCalendarData } from "../../../data/Dummy-Data";

export default function LeaveCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchLeaveCalendarData().then((data) => {
      const formattedEvents = data.flatMap((leave) =>
        leave.leaveDates.map((date) => ({
          title: leave.employeeName,
          start: date,
          allDay: true,
          status: leave.status,

          // 🔥 MUST set here to avoid gray background
          backgroundColor: getStatusColor(leave.status),
          borderColor: getStatusColor(leave.status),
          textColor: "#000",
        }))
      );

      setEvents(formattedEvents);
    });
  }, []);

  return (
    <div className="w-full rounded-xl bg-white p-3 shadow-sm">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height={360}              // screen-fit height
        dayMaxEvents={2}          // compact
        eventContent={renderEvent}
      />
    </div>
  );
}

/* ---------- Custom Event Renderer ---------- */
function renderEvent(arg) {
  return (
    <div
      style={{
        fontSize: "10px",          // small text
        width: "100%",
        display: "flex",
        justifyContent: "center",  // x-axis center
        alignItems: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={`${arg.event.title} (${arg.event.extendedProps.status})`}
    >
      {arg.event.title}
    </div>
  );
}

/* ---------- Status Color Helper ---------- */
function getStatusColor(status) {
  if (status === "Approved") return "#22c55e";
  if (status === "Pending") return "#facc15";
  if (status === "Rejected") return "#ef4444";
  return "#e5e7eb";
}
