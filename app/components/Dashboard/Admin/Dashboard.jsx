"use client"

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
    // Reset current slide index to start from the beginning
    setCurrentSlideIndex(0);
  };

  const closeCatchUpModal = () => {
    setShowCatchUpModal(false);
  };

  const nextSlide = () => {
    if (currentSlideIndex < catchUpActivities.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      // Close modal if at the last slide
      setShowCatchUpModal(false);
    }
  };

  const markAsSeen = (index) => {
    // Logic to mark the activity as seen (could be updating a backend API)
    console.log(`Activity marked as seen: ${catchUpActivities[index]}`);
  };

  return (
    <AdminDashboardLayout>
      <section className="max-w-[1640px] flex flex-col gap-6 px-4 lg:px-8 py-8 md:h-screen overflow-y-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_30%] gap-8">
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
              <Link href="" title="CSC 101" className="bg-white rounded-lg p-1">
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
              <Link href="" title="CSC 101" className="bg-white rounded-lg p-1">
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
              <Link href="" title="CSC 101" className="bg-white rounded-lg p-1">
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

          {/* Calendar */}
          <div className="place-self-end">
            <CalendarView />
          </div>

          {/* Quick Actions Panel */}
          <div className=" rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <li className="card w-36 bg-base-100 shadow-md">
                <div className="card-body" onClick={openCatchUpModal}>
                  <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm">
                      <FaBook />
                    </button>
                  </div>
                  <p>Catch Up</p>
                </div>
              </li>
              <li className="card w-36 bg-base-100 shadow-md">
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm">
                      <FaRegCalendarAlt />
                    </button>
                  </div>
                  <p>Schedule Posts</p>
                </div>
              </li>
              <li className="card w-36 bg-base-100 shadow-md">
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm">
                      <FaChalkboardTeacher />
                    </button>
                  </div>
                  <p>Create New Course</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Schedule and Deadlines */}
          <div className="flex flex-col gap-8">
            <span className="flex flex-col gap-2 bg-white rounded-lg p-6">
              <h2 className="lg:text-xl font-semibold">My Schedule</h2>
              <p className="text-sm">
                Don't forget to check your daily schedule.
              </p>
            </span>

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
            </div>

            {/* Upcoming Assignment Submissions */}
            <div className="flex flex-col gap-4">
              <h2 className="lg:text-lg font-semibold">
                Upcoming Assignment Submissions
              </h2>
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
                      className="btn btn-primary"
                      onClick={() => {
                        markAsSeen(currentSlideIndex);
                        nextSlide();
                      }}
                    >
                      <FaArrowRight />
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={closeCatchUpModal}
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <p>No recent activities.</p>
              )}
            </div>
          </div>
        )}
      </section>
    </AdminDashboardLayout>
  );
};

export default Dashboard;
