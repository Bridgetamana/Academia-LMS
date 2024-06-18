"use client"

import React, { useState } from "react";

const CreateCourseModal = ({ isOpen, onClose, onCreate }) => {
  const [newCourse, setNewCourse] = useState({
    title: "",
    code: "",
    progress: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleCreateCourse = () => {
    onCreate(newCourse);
    setNewCourse({ title: "", code: "", progress: 0 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Create New Course</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Course Code
          </label>
          <input
            type="text"
            name="code"
            value={newCourse.code}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Progress
          </label>
          <input
            type="number"
            name="progress"
            value={newCourse.progress}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
            min="0"
            max="100"
          />
        </div>
        <div className="flex justify-end">
          <button className="btn mr-2" onClick={handleCreateCourse}>
            Create
          </button>
          <button className="btn " onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;
