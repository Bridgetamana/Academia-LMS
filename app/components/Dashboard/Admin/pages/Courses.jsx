"use client";

import { AdminDashboardLayout } from "@/app/_layouts";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import CreateCourseModal from "../CreateNewCourse";
import Link from "next/link";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  const handleCreateCourse = (newCourse) => {
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminDashboardLayout>
      <section className="max-w-[1640px] flex flex-col gap-6 px-6 py-4 pb-8 md:h-screen overflow-y-scroll">
        <div>
          <h2 className="lg:text-xl font-semibold mb-4">Courses</h2>
          <div className="flex justify-between items-center">
            <form className="max-w-sm">
              <label htmlFor="default-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-3 h-3 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#B9B8FB] focus:border-[#B9B8FB] outline-none"
                  placeholder="Find course"
                  required
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
            <div className="flex items-center">
              <button
                className="btn text-academia-general"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus className="mr-2" />
                Create Course
              </button>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="card card-compact bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer w-full"
              >
                <figure>
                  <img
                    src={course.image || "/default-course-image.jpg"}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{course.title}</h2>
                  <p>{course.code}</p>
                  <div className="card-actions justify-end">
                    <Link
                      href=""
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CreateCourseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateCourse}
        />
      </section>
    </AdminDashboardLayout>
  );
};

export default Courses;
