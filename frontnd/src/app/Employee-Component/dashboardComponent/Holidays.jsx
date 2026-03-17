import React from "react";

export default function Holidays() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold">Holidays</h3>
        <span className="text-sm text-blue-500 cursor-pointer">
          August
        </span>
      </div>

      {/* LIST */}
      <div className="space-y-5">
        <HolidayRow
          img="https://i.imgur.com/7z9F5VZ.png"
          title="Raksha Bandhan"
          day="Saturday"
          date="9 August, 2025"
        />

        <HolidayRow
          img="https://i.imgur.com/0XKzn1k.png"
          title="Independence Day"
          day="Friday"
          date="15 August, 2025"
        />

        <HolidayRow
          img="https://i.imgur.com/r4X7Czj.png"
          title="Parsi New Year"
          day="Friday"
          date="16 August, 2025"
        />

        <HolidayRow
          img="https://i.imgur.com/J5LVHEL.png"
          title="Janmashtami"
          day="Saturday"
          date="18 August, 2025"
        />

        <HolidayRow
          img="https://i.imgur.com/9yKQG5L.png"
          title="Ganesh Chaturthi"
          day="Wednesday"
          date="27 August, 2025"
        />
      </div>
    </div>
  );
}

/* ================= HOLIDAY ROW ================= */

function HolidayRow({ img, title, day, date }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={img}
          alt={title}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-500">{day}</p>
        </div>
      </div>

      <span className="text-xs text-gray-400">
        {date}
      </span>
    </div>
  );
}
