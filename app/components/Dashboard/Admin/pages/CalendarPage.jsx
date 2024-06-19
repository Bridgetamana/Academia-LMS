"use client"

import { AdminDashboardLayout } from "@/app/_layouts";
import React, { useState, useEffect } from "react";
import EventCalendarView from "../EventCalendarView";

const CalendarPage = () => {
  const [events, setEvents] = useState({
    assignment: [],
    classSchedule: [],
    otherEvents: [],
  });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || {
      assignment: [],
      classSchedule: [],
      otherEvents: [],
    };
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
            />
          </div>
        </div>
      </section>
    </AdminDashboardLayout>
  );
};

export default CalendarPage;
