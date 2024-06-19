"use client"

import React, { useState } from "react";

const EventManagement = ({ onClose, onSave, selectedDate }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "assignment",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...eventData, date: selectedDate.toISOString().substr(0, 10) });
    setEventData({
      title: "",
      description: "",
      category: "assignment",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-end mb-4">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-4">Create New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
            >
              <option value="assignment">Assignment Deadline</option>
              <option value="classSchedule">Class Schedule</option>
              <option value="otherEvents">Other Events</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary mr-2">
              Save Event
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventManagement;
