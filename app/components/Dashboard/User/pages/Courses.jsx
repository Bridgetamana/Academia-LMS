"use client";

import { AdminDashboardLayout } from "@/app/_layouts";
import React, { useState } from "react";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    { title: "Communication skills", code: "Gst 102", progress: 20 },
    { title: "Nigerian People and culture", code: "Gst 203", progress: 100 },
    { title: "Communication skills", code: "Gst 102", progress: 50 },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminDashboardLayout>
      <section className="max-w-[1640px] flex flex-col gap-6 px-6 py-4 pb-8 md:h-screen overflow-y-scroll">
        <div>
          <h2 className="lg:text-xl font-semibold mb-4">Courses</h2>
          <div>
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
                  placeholder="find course"
                  required
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="card card-compact bg-base-100 shadow-md hover:shadow-lg cursor-pointer max-w-sm lg:max-w-lg"
              >
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt={course.title}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{course.title}</h2>
                  <p className="uppercase">{course.code}</p>
                  <div className="card-actions justify-end">
                    <div
                      className="radial-progress"
                      style={{ "--value": course.progress, "--size": "4rem" }}
                      role="progressbar"
                    >
                      {course.progress}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminDashboardLayout>
  );
};

export default Courses;
