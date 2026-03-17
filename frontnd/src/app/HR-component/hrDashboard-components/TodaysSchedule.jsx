import React, { useEffect, useState } from "react";
import axios from "axios";

const START_HOUR = 8;
const END_HOUR = 12;
const HOURS = [8, 9, 10, 11, 12];
const TOTAL_HOURS = END_HOUR - START_HOUR;

export default function TodaysSchedule() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    details: "",
    date: "",
    time: "09:00",
  });

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("/api/schedules");

      setEvents(
        res.data.map((item, index) => ({
          ...item,
          color: index % 2 ? "bg-blue-300" : "bg-red-300",
          row: index % 2,
        })),
      );
    } catch {
      setEvents([
        {
          id: 1,
          title: "Online Interviews",
          start: 8,
          end: 10,
          color: "bg-red-300",
          row: 0,
        },
        {
          id: 2,
          title: "Weekly Meeting",
          start: 9,
          end: 10,
          color: "bg-blue-300",
          row: 1,
        },
      ]);
    }
  };

  /* ================= ADD DATA ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const startHour = parseInt(form.time.split(":")[0]);
    const endHour = startHour + 1;

    const newEvent = {
      id: Date.now(),
      title: form.title,
      start: startHour,
      end: endHour,
      color: "bg-green-300",
      row: events.length % 2,
    };

    try {
      await axios.post("/api/schedules", newEvent);
    } catch {}

    setEvents((prev) => [...prev, newEvent]);
    setOpen(false);
    setForm({ title: "", details: "", date: "", time: "09:00" });
  };

  return (
    <>
      {/* ================= CARD ================= */}
      <div className="w-full max-w-2xl rounded-xl bg-white p-4 shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Todays Schedule
          </h2>

          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg- from-sky-500 to-slate-900 px-2 py-1 text-[11px] text-white"
          >
            + Add Schedule
          </button>
        </div>

        {/* Time Header */}
        <div className="relative ml-28 mb-2 flex justify-between text-[10px] text-gray-400">
          {HOURS.map((h) => (
            <span key={h}>{String(h).padStart(2, "0")}:00</span>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative ml-28 h-28 rounded-md bg-red-50">
          {events.map((event) => {
            const left = ((event.start - START_HOUR) / TOTAL_HOURS) * 100;
            const width = ((event.end - event.start) / TOTAL_HOURS) * 100;

            return (
              <div
                key={event.id}
                className={`absolute flex items-center rounded px-2 py-1 text-[11px] text-gray-800 ${event.color}`}
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  top: `${8 + event.row * 32}px`,
                }}
              >
                <span className="mr-1 h-2.5 w-0.5 rounded bg-gray-800" />
                {event.title}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-1 text-base font-semibold">Add a Schedule</h3>
            <p className="mb-4 text-xs text-gray-400">
              Create a new schedule to manage your time effectively
            </p>

            {/* 🔹 2 ROW × 2 COLUMN FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Schedule Name */}
                <div>
                  <label className="text-xs text-gray-500">
                    Schedule Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="mt-1 w-full rounded-md bg-gray-100 px-3 py-2 text-sm"
                  />
                </div>

                {/* Details */}
                <div>
                  <label className="text-xs text-gray-500">
                    Details <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={form.details}
                    onChange={(e) =>
                      setForm({ ...form, details: e.target.value })
                    }
                    className="mt-1 w-full rounded-md bg-gray-100 px-3 py-2 text-sm"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="text-xs text-gray-500">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="mt-1 w-full rounded-md bg-gray-100 px-3 py-2 text-sm"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="text-xs text-gray-500">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="mt-1 w-full rounded-md bg-gray-100 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border px-4 py-1.5 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg- from-sky-500 to-slate-900 px-4 py-1.5 text-sm text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
