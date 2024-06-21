"use client";

import React, { useState } from "react";
import Image from "next/image";
import Course1 from "@/public/assets/images/course-1.jpg";

const CreateCourseModal = ({ isOpen, onClose, onCreate }) => {
  const [newCourse, setNewCourse] = useState({
    title: "",
    instructorName: "",
    description: "",
    syllabus: [],
    courseOutline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFile = {
        name: file.name,
        url: URL.createObjectURL(file),
      };
      const updatedFiles = [...newCourse.syllabus, newFile];
      setNewCourse({ ...newCourse, syllabus: updatedFiles });
    }
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = newCourse.syllabus.filter((_, i) => i !== index);
    setNewCourse({ ...newCourse, syllabus: updatedFiles });
  };

  const handleCreateCourse = () => {
    onCreate(newCourse);
    setNewCourse({
      title: "",
      instructorName: "",
      description: "",
      syllabus: [],
      courseOutline: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-96 max-h-screen overflow-y-auto">
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
            Instructor Name
          </label>
          <input
            type="text"
            name="instructorName"
            value={newCourse.instructorName}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Course Description
          </label>
          <textarea
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Syllabus
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
          />
          {newCourse.syllabus.length > 0 && (
            <ul className="mt-2">
              {newCourse.syllabus.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <a href={file.url} className="text-blue-600 hover:underline">
                    {file.name}
                  </a>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteFile(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Course Outline
          </label>
          <textarea
            name="courseOutline"
            value={newCourse.courseOutline}
            onChange={handleInputChange}
            rows={6}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Course Image
          </label>
          <div className="flex items-center gap-4">
            <Image src={Course1} alt="Course Image" width={100} height={100} />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="btn mr-2" onClick={handleCreateCourse}>
            Create
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;
