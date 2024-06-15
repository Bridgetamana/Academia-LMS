import React from "react";
import { FaBell, FaCalendar, FaClock, FaFile, FaSync } from "react-icons/fa";

const Features = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-16 lg:flex">
      <div className="text-center w-full flex flex-col gap-6">
        <span>
          <p className="text-[20px] md:text-[30px] font-bold text-[#080808]">
            FEATURES
          </p>
          <hr className="border-[2px] border-[#8A2387] w-[40px] mx-auto" />
        </span>

        <p className="text-[#7A8A98] text-[18px] md:text-[24px]">
          An overview of our features.
        </p>

        {/* Academia features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature: Stay Updated, Instantly */}
          <div className="card w-96 shadow-md">
            <div className="card-body">
              <span className="text-start">
                <span className="avatar placeholder p-3 rounded-lg bg-[#e3ddf8] mb-4">
                  <FaBell className="text-xl text-[#381A6D]" />
                </span>
                <h2 className="card-title">Stay Updated, Instantly</h2>
              </span>
              <p className="text-start text-[#79767D]">
                Receive immediate notifications when new course materials,
                lecture notes, or supplemental readings are available.
              </p>
            </div>
          </div>

          {/* Feature: All Your Dates in One Place */}
          <div className="card w-96 shadow-md">
            <div className="card-body">
              <span className="text-start">
                <span className="avatar placeholder p-3 rounded-lg bg-[#EAF0C9] mb-4">
                  <FaSync className="text-xl text-[#697115]" />
                </span>
                <h2 className="card-title">All Your Dates in One Place</h2>
              </span>
              <p className="text-start text-[#79767D]">
                Sync your academic calendar with your personal one. Keep all
                important dates in one convenient location.
              </p>
            </div>
          </div>

          {/* Feature: Never Miss a Deadline */}
          <div className="card w-96 shadow-md">
            <div className="card-body">
              <span className="text-start">
                <span className="avatar placeholder p-3 rounded-lg bg-[#F6E2F8] mb-4">
                  <FaClock className="text-xl text-[#9C03AD]" />
                </span>
                <h2 className="card-title">Never Miss a Deadline</h2>
              </span>
              <p className="text-start text-[#79767D]">
                Get timely reminders for upcoming deadlines, assignments,
                quizzes, and exams to ensure you stay on top of your academic
                responsibilities.
              </p>
            </div>
          </div>

          {/* Feature: Quick PDF Summaries */}
          <div className="card w-96 shadow-md">
            <div className="card-body">
              <span className="text-start">
                <span className="avatar placeholder p-3 rounded-lg bg-[#F8E4E1] mb-4">
                  <FaFile className="text-xl text-[#C71C1A]" />
                </span>
                <h2 className="card-title">Quick PDF Summaries</h2>
              </span>
              <p className="text-start text-[#79767D]">
                Automatically generate concise summaries of lengthy PDFs. Save
                time and quickly grasp key points from your course materials.
              </p>
            </div>
          </div>

          {/* Feature: Efficient Assignment Management */}
          <div className="card w-96 shadow-md">
            <div className="card-body">
              <span className="text-start">
                <span className="avatar placeholder p-3 rounded-lg bg-[#e3ddf8] mb-4">
                  <FaCalendar className="text-xl text-[#381A6D]" />
                </span>
                <h2 className="card-title">Efficient Assignment Management</h2>
              </span>
              <p className="text-start text-[#79767D]">
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
