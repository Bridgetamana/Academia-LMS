import React from "react";
import { FaBell, FaCalendar, FaClock, FaFile, FaSync } from "react-icons/fa";

const Features = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-16 lg:flex">
      <div className="text-center w-full flex flex-col gap-6">
        <span>
          <p className="text-[20px] md:text-[30px] font-bold text-neutral-900">
            FEATURES
          </p>
          <hr className="border-[2px] border-accent-600 w-[40px] mx-auto" />
        </span>

        <p className="text-neutral-700 text-[18px] md:text-[24px]">
          An overview of our features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <div className="card max-w-xs sm:max-w-sm lg:max-w-md w-full shadow-md">
            <div className="card-body">
              <span className="text-start">
                <span className="avatar placeholder p-3 rounded-lg bg-primary-200 mb-4">
                  <FaBell className="text-xl text-primary-600" />
                </span>
                <h2 className="card-title text-neutral-500 text-lg">Stay Updated, Instantly</h2>
              </span>
              <p className="text-start text-neutral-700">
                Receive immediate notifications when new course materials,
                lecture notes, or supplemental readings are available.
              </p>
            </div>
          </div>

          <div className="card max-w-xs sm:max-w-sm lg:max-w-md w-full shadow-md">
            <div className="card-body">
              <span className="text-start">
                <span className="avatar placeholder p-3 rounded-lg bg-accent-100 mb-4">
                  <FaSync className="text-xl text-accent" />
                </span>
                <h2 className="card-title text-neutral-500 text-lg">All Your Dates in One Place</h2>
              </span>
              <p className="text-start text-neutral-700">
                Sync your academic calendar with your personal one. Keep all
                important dates in one convenient location.
              </p>
            </div>
          </div>

          <div className="card max-w-xs sm:max-w-sm lg:max-w-md w-full shadow-md">
            <div className="card-body">
              <span className="text-start">
                <span className="avatar placeholder p-3 rounded-lg bg-[#F6E2F8] mb-4">
                  <FaClock className="text-xl text-[#9C03AD]" />
                </span>
                <h2 className="card-title text-neutral-500 text-lg">Never Miss a Deadline</h2>
              </span>
              <p className="text-start text-neutral-700">
                Get timely reminders for upcoming deadlines, assignments,
                quizzes, and exams to ensure you stay on top of your academic
                responsibilities.
              </p>
            </div>
          </div>

          <div className="card max-w-xs sm:max-w-sm lg:max-w-md w-full shadow-md">
            <div className="card-body">
              <span className="text-start">
                <span className="avatar placeholder p-3 rounded-lg bg-error-100 mb-4">
                  <FaFile className="text-xl text-error-700" />
                </span>
                <h2 className="card-title text-neutral-500 text-lg">Quick PDF Summaries</h2>
              </span>
              <p className="text-start text-neutral-700">
                Automatically generate concise summaries of lengthy PDFs. Save
                time and quickly grasp key points from your course materials.
              </p>
            </div>
          </div>

          <div className="card max-w-xs sm:max-w-sm lg:max-w-md w-full shadow-md">
            <div className="card-body">
              <span className="text-start">
                <span className="avatar placeholder p-3 rounded-lg bg-[#e3ddf8] mb-4">
                  <FaCalendar className="text-xl text-primary-700" />
                </span>
                <h2 className="card-title text-neutral-500 text-lg">Efficient Assignment Management</h2>
              </span>
              <p className="text-start text-neutral-700">
                Educators can schedule, manage, and monitor assignments with
                ease. Enhance the teaching and learning experience with
                streamlined workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
