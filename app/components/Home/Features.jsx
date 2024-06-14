import React from "react";
import { FaBell, FaCalendar, FaClock, FaFile, FaSync } from "react-icons/fa";

const Features = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-24 lg:flex">
      <div className="text-center w-full flex flex-col gap-6">
        <span>
          <p className="text-[14px] font-bold text-[#1E1C27]">FEATURES</p>
          <hr className="border-[2px] border-[#8A2387] w-[40px] mx-auto" />
        </span>

        <p className="text-[#7A8A98] text-[20px] md:text-[32px]">
          An overview of our features.
        </p>

        {/* Add Academia features here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card w-96 shadow-xl ">
            <div className="card-body">
              <span className=" text-start">
                <FaBell className="text-3xl mb-4 text-[#79767D]" />
                <h2 className="card-title">Stay Updated, Instantly</h2>
              </span>
              <p className=" text-start text-[#79767D]">
                Receive immediate notifications when new course materials,
                lecture notes, or supplemental readings are available.
              </p>
            </div>
          </div>
          <div className="card w-96 shadow-xl">
            <div className="card-body">
              <span className=" text-start">
                <FaSync className="text-3xl mb-4 text-[#79767D]" />
                <h2 className="card-title">All Your Dates in One Place</h2>
              </span>
              <p className=" text-start text-[#79767D]">
                Sync your academic calendar with your personal one. Keep all
                important dates in one convenient location.
              </p>
            </div>
          </div>
          <div className="card w-96 shadow-xl">
            <div className="card-body">
              <span className=" text-start">
                <FaClock className="text-3xl mb-4 text-[#79767D]" />
                <h2 className="card-title">Never Miss a Deadline</h2>
              </span>
              <p className=" text-start text-[#79767D]">
                Get timely reminders for upcoming deadlines, assignments,
                quizzes, and exams to ensure you stay on top of your academic
                responsibilities.
              </p>
            </div>
          </div>
          <div className="card w-96 shadow-xl">
            <div className="card-body">
              <span className=" text-start">
                <FaFile className="text-3xl mb-4 text-[#79767D]" />
                <h2 className="card-title">Quick PDF Summaries</h2>
              </span>
              <p className=" text-start text-[#79767D]">
                Automatically generate concise summaries of lengthy PDFs. Save
                time and quickly grasp key points from your course materials.
              </p>
            </div>
          </div>
          <div className="card w-96 shadow-xl">
            <div className="card-body">
              <span className=" text-start">
                <FaCalendar className="text-3xl mb-4 text-[#79767D]" />
                <h2 className="card-title">Efficient Assignment Management</h2>
              </span>
              <p className=" text-start text-[#79767D]">
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
