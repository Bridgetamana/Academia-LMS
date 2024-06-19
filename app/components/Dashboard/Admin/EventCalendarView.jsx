import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventManagement from "./EventManagement";

const EventCalendarView = ({ events, onDateClick, onSaveEvent }) => {
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateClick(date);
  };

  const handleSaveEvent = (eventData) => {
    onSaveEvent(eventData);
    setSelectedDate(null);
  };

  const getEventsByCategory = (category) => {
    if (!events || !events[category]) {
      return [];
    }
    return events[category];
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Left: Calendar View */}
      <div className="w-2/4 p-4 border-r border-gray-200">
        <Calendar
          onChange={() => {}}
          value={new Date()}
          view={view}
          tileContent={({ date }) => {
            const dateString = date.toISOString().substr(0, 10); // YYYY-MM-DD
            const eventExists =
              getEventsByCategory("assignment").some(
                (event) => event.date === dateString
              ) ||
              getEventsByCategory("classSchedule").some(
                (event) => event.date === dateString
              ) ||
              getEventsByCategory("otherEvents").some(
                (event) => event.date === dateString
              );
            return (
              eventExists && (
                <span className="bg-green-500 rounded-full block"></span>
              )
            );
          }}
          onClickDay={handleDateClick}
        />
      </div>

      {/* Right: Sidebar for Event Categories */}
      <div className="w-2/4 p-4">
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>

        {/* Assignment Deadlines */}
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Assignment Deadlines</h3>
          <ul>
            {getEventsByCategory("assignment").map((event, index) => (
              <li
                key={index}
                className="mb-2 bg-yellow-200 p-2 border-l-4 border-yellow-700 rounded-sm"
              >
                <div className="flex items-center">
                  <div className="text-sm text-[#62636C] mr-1">
                    @{event.date},
                  </div>
                  <div className="font-semibold text-[#1E1F24]">
                    {event.title}
                  </div>
                </div>
                <div className="">{event.description}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Class Schedules */}
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Class Schedules</h3>
          <ul>
            {getEventsByCategory("classSchedule").map((event, index) => (
              <li
                key={index}
                className="mb-2 bg-green-200 p-2 border-l-4 border-green-700 rounded-sm"
              >
                <div className="flex items-center">
                  <div className="text-sm text-[#62636C] mr-1">
                    @{event.date},
                  </div>
                  <div className="font-semibold text-[#1E1F24]">
                    {event.title}
                  </div>
                </div>
                <div className="">{event.description}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Events */}
        <div>
          <h3 className="text-md font-semibold mb-2">Other Events</h3>
          <ul>
            {getEventsByCategory("otherEvents").map((event, index) => (
              <li
                key={index}
                className="mb-2 bg-indigo-200 p-2 border-l-4 border-indigo-700 rounded-sm"
              >
                <div className="flex items-center">
                  <div className="text-sm text-[#62636C] mr-1">
                    @{event.date},
                  </div>
                  <div className="font-semibold text-[#1E1F24]">
                    {event.title}
                  </div>
                </div>
                <div className="">{event.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Event Management Modal */}
      {selectedDate && (
        <EventManagement
          onClose={() => setSelectedDate(null)}
          onSave={handleSaveEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default EventCalendarView;
