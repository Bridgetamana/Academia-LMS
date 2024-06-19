"use client"

import { AdminDashboardLayout } from "@/app/_layouts";
import React, { useState, useEffect } from "react";
import EventCalendarView from "../EventCalendarView";

const CalendarPage = () => {
  const initialEvents = {
    assignment: [],
    classSchedule: [],
    otherEvents: [],
  };

  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem("events")) || initialEvents;
    setEvents(storedEvents);
  }, []);

  const handleSaveEvent = (newEvent) => {
    const updatedEvents = {
      ...events,
      [newEvent.category]: [
        ...(events[newEvent.category] || []),
        { ...newEvent, id: events[newEvent.category]?.length + 1 || 1 },
      ],
    };
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = {
      ...events,
      assignment: events.assignment.filter((event) => event.id !== eventId),
      classSchedule: events.classSchedule.filter(
        (event) => event.id !== eventId
      ),
      otherEvents: events.otherEvents.filter((event) => event.id !== eventId),
    };
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <AdminDashboardLayout>
      <section className="max-w-[1640px] flex flex-col gap-6 px-6 py-4 pb-8 md:h-screen overflow-y-scroll">
        <div>
          <h2>Calendar View</h2>
          <div className="container mx-auto p-4">
            <EventCalendarView
              events={events}
              onDateClick={(date) => console.log("Date clicked:", date)}
              onSaveEvent={handleSaveEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        </div>
      </section>
    </AdminDashboardLayout>
  );
};

export default CalendarPage;
