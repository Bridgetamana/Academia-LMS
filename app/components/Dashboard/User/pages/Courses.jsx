"use client";

import { AdminDashboardLayout } from "@/app/_layouts";
import React, { useState } from "react";
import Course1 from "@/public/assets/images/course-1.jpg";
import Link from "next/link";
import Image from "next/image";
import { FaExclamationCircle } from "react-icons/fa";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses] = useState([
    {
      id: 1,
      title: "Communication Skills",
      description: "Lorem Ipsum Lorem",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      description: "Lorem Ipsum Lorem",
    },
  ]);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminDashboardLayout>
      <section className="max-w-[1640px] flex flex-col gap-6 px-6 py-4 pb-8 md:h-screen overflow-y-scroll">
        <div>
          <h2 className="lg:text-xl font-semibold mb-4">Courses</h2>
          <div className="flex justify-between items-center mb-4">
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
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredCourses.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <div className="bg-white hover:shadow-md border rounded-md w-80 lg:w-64 h-full">
                    <figure>
                      <Image
                        src={Course1}
                        alt={course.title}
                        width={300}
                        height={200}
                        className="object-cover w-full h-48 rounded-t-lg"
                      />
                    </figure>
                    <div className="p-4 flex-auto">
                      <h2 className="text-2xl font-semibold mt-2">
                        {course.title}
                      </h2>
                      <p className="text-gray-400 mb-4">{course.description}</p>
                      <div className="flex items-center justify-end ">
                        <div
                          className="radial-progress"
                          style={{
                            "--value": "40",
                            "--size": "2rem",
                            "--thickness": "4px",
                          }}
                          role="progressbar"
                        >
                          40%
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48">
              <FaExclamationCircle className="text-gray-400 text-3xl mb-4" />
              <p className="text-gray-400">No courses found.</p>
            </div>
          )}
        </div>
      </section>
    </AdminDashboardLayout>
  );
};

export default Courses;
