import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EventManagement from "./EventManagement";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const EventCalendarView = ({
  events,
  onDateClick,
  onSaveEvent,
  onDeleteEvent,
}) => {
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateClick(date);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (eventData) => {
    onSaveEvent(eventData);
    setSelectedDate(null);
  };

  const handleDeleteEvent = (eventId) => {
    onDeleteEvent(eventId);
    setSelectedEvent(null); 
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const canEditEvent = (event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate > today;
  };

  const getEventsByCategory = (category) => {
    if (!events || !events[category]) {
      return [];
    }
    return events[category];
  };

  return (
    <div className="md:flex gap-8 justify-center">
      {/* Left: Calendar View */}
      <div className=" p-4 md:border-r border-gray-200">
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

        {/* Display selected event details in a modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg max-w-lg w-full">
              <div className="flex items-center justify-end">
                <button
                  className="mr-2  text-red-600"
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                >
                  <MdDelete />
                </button>

                {canEditEvent(selectedEvent) && (
                  <button
                    className=" text-blue-600"
                    onClick={() => {
                      setSelectedDate(selectedEvent.date);
                    }}
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  className="ml-2 btn rounded-full text-sm text-gray-600"
                  onClick={() => setSelectedEvent(null)}
                >
                  x
                </button>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {selectedEvent.title}
              </h3>
              <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
              <p className="text-sm text-gray-400 mb-2">
                Date: {selectedEvent.date}
              </p>
            </div>
          </div>
        )}

        {/* Assignment Deadlines */}
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Assignment Deadlines</h3>
          <ul>
            {getEventsByCategory("assignment").map((event, index) => (
              <li
                key={index}
                className="mb-2 bg-yellow-200 p-2 border-l-4 border-yellow-700 rounded-sm cursor-pointer"
                onClick={() => handleEventClick(event)}
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
                className="mb-2 bg-green-200 p-2 border-l-4 border-green-700 rounded-sm cursor-pointer"
                onClick={() => handleEventClick(event)}
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
                className="mb-2 bg-indigo-200 p-2 border-l-4 border-indigo-700 rounded-sm cursor-pointer"
                onClick={() => handleEventClick(event)}
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
