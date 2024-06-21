"use client";

import { AdminDashboardLayout } from "@/app/_layouts";
import React, { useState } from "react";
import CalendarView from "./CalendarView";
import { BsThreeDotsVertical, BsStopwatch } from "react-icons/bs";
import Image from "next/image";
import Course1 from "@/public/assets/images/course-1.jpg";
import Course2 from "@/public/assets/images/course-2.jpg";
import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaBook,
  FaArrowRight,
  FaRegCalendarAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const [showCatchUpModal, setShowCatchUpModal] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [catchUpActivities, setCatchUpActivities] = useState([
    "New assignment posted in CSC 101",
    "Updated course materials in MTH 101",
    "Discussion started in PHY 101",
  ]);

  const openCatchUpModal = () => {
    setShowCatchUpModal(true);
    setCurrentSlideIndex(0);
  };

  const closeCatchUpModal = () => {
    setShowCatchUpModal(false);
  };

  const nextSlide = () => {
    if (currentSlideIndex < catchUpActivities.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setShowCatchUpModal(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <section className="max-w-[1640px] flex flex-col gap-6 px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_30%] gap-8">
          <div>
            <div className=" rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                <li
                  className="py-4 pl-5 bg-white border hover:shadow-md rounded-lg cursor-pointer"
                  onClick={openCatchUpModal}
                >
                  <div className="space-y-2">
                    <div>
                      <button className="btn btn-square bg-slate-200 btn-sm text-xl ">
                        <FaBook />
                      </button>
                    </div>
                    <p>Catch Up</p>
                  </div>
                </li>
                <li className="py-4 pl-5 bg-white border hover:shadow-md rounded-lg cursor-pointer">
                  <div className="space-y-2">
                    <div>
                      <button className="btn btn-square bg-slate-200 btn-sm text-xl">
                        <FaRegCalendarAlt />
                      </button>
                    </div>
                    <p>Schedule Posts</p>
                  </div>
                </li>
                <li className="py-4 pl-5 bg-white border hover:shadow-md rounded-lg cursor-pointer">
                  <div className="space-y-2">
                    <div>
                      <button className="btn btn-square bg-slate-200 btn-sm text-xl">
                        <FaChalkboardTeacher />
                      </button>
                    </div>
                    <p>Create New Course</p>
                  </div>
                </li>
                <li className="py-4 pl-5 bg-white border hover:shadow-md rounded-lg cursor-pointer">
                  <div className="space-y-2">
                    <div>
                      <button className="btn btn-square bg-slate-200 btn-sm text-xl">
                        <FaRegCalendarAlt />
                      </button>
                    </div>
                    <p>Schedule Posts</p>
                  </div>
                </li>
              </ul>
            </div>
            {/* Recently Accessed Courses */}
            <div className="flex flex-col gap-6">
              <span className="flex flex-col gap-2">
                <h2 className="lg:text-xl font-semibold">
                  Recently Accessed Courses
                </h2>
                <p className="text-sm">
                  Some of the courses you've recently viewed or interacted with.
                </p>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Link
                  href=""
                  title="CSC 101"
                  className="bg-white rounded-lg p-1"
                >
                  <div className="bg-[#FCF0D7] rounded-lg p-1 relative pb-20">
                    <Image src={Course1} alt="course" className="" />
                    <span className="flex justify-center">
                      <span className="flex flex-col gap-1 absolute bottom-4 px-4">
                        <p className="font-semibold">CSC 101</p>
                        <p className="text-xs font-medium">
                          Self-paced course • 4 weeks
                        </p>
                      </span>
                    </span>
                  </div>
                </Link>
                <Link
                  href=""
                  title="CSC 101"
                  className="bg-white rounded-lg p-1"
                >
                  <div className="bg-[#CCF4FD] rounded-lg p-1 relative pb-20">
                    <Image src={Course2} alt="course" className="" />
                    <span className="flex justify-center">
                      <span className="flex flex-col gap-1 absolute bottom-4 px-4">
                        <p className="font-semibold">CSC 101</p>
                        <p className="text-xs font-medium">
                          Self-paced course • 4 weeks
                        </p>
                      </span>
                    </span>
                  </div>
                </Link>
                <Link
                  href=""
                  title="CSC 101"
                  className="bg-white rounded-lg p-1"
                >
                  <div className="bg-[#FCF0D7] rounded-lg p-1 relative pb-20">
                    <Image src={Course1} alt="course" className="" />
                    <span className="flex justify-center">
                      <span className="flex flex-col gap-1 absolute bottom-4 px-4">
                        <p className="font-semibold">CSC 101</p>
                        <p className="text-xs font-medium">
                          Self-paced course • 4 weeks
                        </p>
                      </span>
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="mt-6 p-6 bg-white rounded-md">
              <h2 className="lg:text-xl font-semibold mb-4">Announcements</h2>
              <div>
                <ol class="relative border-s border-gray-200">
                  <li class="mb-4 ms-4">
                    <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                      February 2022
                    </time>
                    <span className="flex justify-between items-center">
                      <h3 class="text-lg font-semibold text-gray-900">
                        PHY102 Classes starts tomorrow
                      </h3>
                      <a
                        href="#"
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-academia-general focus:outline-none focus:text-academia-general"
                      >
                        View Details{" "}
                        <svg
                          class="w-3 h-3 ms-2 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </span>
                  </li>
                  <li class="mb-4 ms-4">
                    <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-400">
                      February 2022
                    </time>
                    <span className="flex justify-between items-center">
                      <h3 class="text-lg font-semibold text-gray-900">
                        PHY102 Classes starts tomorrow
                      </h3>
                      <a
                        href="#"
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-academia-general focus:outline-none focus:text-academia-general"
                      >
                        View Details{" "}
                        <svg
                          class="w-3 h-3 ms-2 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div>
            {/* Calendar */}
            <div className="place-self-end">
              <CalendarView />
            </div>

            {/* Schedule and Deadlines */}
            <div className="flex flex-col gap-8 mt-2">
              {/* Upcoming Classes */}
              <div className="flex flex-col gap-4">
                <h2 className="lg:text-lg font-semibold">Upcoming Classes</h2>
                <div className="bg-green-300 rounded-lg py-4 px-6 flex gap-6 justify-between items-center">
                  <span className="flex flex-col gap-2">
                    <p className="lg:text-xl font-semibold">MTH 101</p>
                    <span className="flex gap-4">
                      <BsStopwatch className="w-5 h-5" />{" "}
                      <p className="text-sm font-medium">16 June • 18:00</p>
                    </span>
                  </span>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-black/20 active:scale-95"
                  >
                    <BsThreeDotsVertical className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-green-300 rounded-lg py-4 px-6 flex gap-6 justify-between items-center">
                  <span className="flex flex-col gap-2">
                    <p className="lg:text-xl font-semibold">MTH 101</p>
                    <span className="flex gap-4">
                      <BsStopwatch className="w-5 h-5" />{" "}
                      <p className="text-sm font-medium">16 June • 18:00</p>
                    </span>
                  </span>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-black/20 active:scale-95"
                  >
                    <BsThreeDotsVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* Upcoming Deadlines */}
              <div className="flex flex-col gap-4">
                <h2 className="lg:text-lg font-semibold">Upcoming Deadlines</h2>
                <div className="bg-red-300 rounded-lg py-4 px-6 flex gap-6 justify-between items-center">
                  <span className="flex flex-col gap-2">
                    <p className="lg:text-xl font-semibold">
                      CSC 101 Group Project
                    </p>
                    <span className="flex gap-4">
                      <BsStopwatch className="w-5 h-5" />{" "}
                      <p className="text-sm font-medium">16 June • 18:00</p>
                    </span>
                  </span>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-black/20 active:scale-95"
                  >
                    <BsThreeDotsVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Catch-Up Modal */}
        {showCatchUpModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-lg font-semibold mb-4">
                Catch-Up Activities
              </h2>
              {catchUpActivities.length > 0 ? (
                <>
                  <p className="mb-4">{catchUpActivities[currentSlideIndex]}</p>
                  <div className="flex justify-between">
                    <button
                      className="btn btn-ghost"
                      onClick={closeCatchUpModal}
                    >
                      Close
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        markAsSeen(currentSlideIndex);
                        nextSlide();
                      }}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </>
              ) : (
                <p>Great</p>
              )}
            </div>
          </div>
        )}
      </section>
    </AdminDashboardLayout>
  );
};

export default Dashboard;
