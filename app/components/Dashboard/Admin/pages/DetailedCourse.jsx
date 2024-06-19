import { useState } from "react";
import { AdminDashboardLayout } from "@/app/_layouts";
import Link from "next/link";

const CourseDetails = () => {
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isAssignmentsOpen, setIsAssignmentsOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isDiscussionsOpen, setIsDiscussionsOpen] = useState(false);

  const course = {
    id: "1",
    title: "Course Title",
    instructorName: "Instructor Name",
    description: "Course Description",
    syllabus: ["Syllabus Item 1", "Syllabus Item 2", "Syllabus Item 3"],
    lectures: ["Lecture 1", "Lecture 2"],
    readingMaterials: ["Reading Material 1", "Reading Material 2"],
    multimediaResources: ["Video 1", "Audio 1", "Slides 1"],
    downloadableFiles: ["File 1", "File 2"],
    generalDiscussionBoard: "General Discussion Board",
    topicSpecificThreads: ["Thread 1", "Thread 2"],
    qaSection: "Q&A Section",
    assignments: [
      { id: "1", title: "Assignment 1", dueDate: "2024-07-01" },
      { id: "2", title: "Assignment 2", dueDate: "2024-07-15" },
    ],
  };

  const toggleSection = (section) => {
    switch (section) {
      case "overview":
        setIsOverviewOpen(!isOverviewOpen);
        break;
      case "assignments":
        setIsAssignmentsOpen(!isAssignmentsOpen);
        break;
      case "materials":
        setIsMaterialsOpen(!isMaterialsOpen);
        break;
      case "discussions":
        setIsDiscussionsOpen(!isDiscussionsOpen);
        break;
      default:
        break;
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-[1640px] mx-auto px-6 py-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>

          {/* Course Overview */}
          <div className="mb-4">
            <button
              className="flex items-center justify-between w-full bg-gray-200 rounded-lg px-4 py-2 mb-2 cursor-pointer"
              onClick={() => toggleSection("overview")}
            >
              <span className="text-lg font-semibold">Course Overview</span>
              <svg
                className={`w-6 h-6 transition-transform ${
                  isOverviewOpen ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isOverviewOpen && (
              <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100">
                <p>Instructor: {course.instructorName}</p>
                <p>Description: {course.description}</p>
                <p>Syllabus/Outline:</p>
                <ul>
                  {course.syllabus.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Assignments */}
          <div className="mb-4">
            <button
              className="flex items-center justify-between w-full bg-gray-200 rounded-lg px-4 py-2 mb-2 cursor-pointer"
              onClick={() => toggleSection("assignments")}
            >
              <span className="text-lg font-semibold">Assignments</span>
              <svg
                className={`w-6 h-6 transition-transform ${
                  isAssignmentsOpen ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isAssignmentsOpen && (
              <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100">
                {course.assignments.map((assignment) => (
                  <div key={assignment.id} className="mb-2">
                    <p>{assignment.title}</p>
                    <p>Due Date: {assignment.dueDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Course Materials */}
          <div className="mb-4">
            <button
              className="flex items-center justify-between w-full bg-gray-200 rounded-lg px-4 py-2 mb-2 cursor-pointer"
              onClick={() => toggleSection("materials")}
            >
              <span className="text-lg font-semibold">Course Materials</span>
              <svg
                className={`w-6 h-6 transition-transform ${
                  isMaterialsOpen ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isMaterialsOpen && (
              <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100">
                <p>Lectures:</p>
                <ul>
                  {course.lectures.map((lecture, index) => (
                    <li key={index}>{lecture}</li>
                  ))}
                </ul>
                <p>Reading Materials:</p>
                <ul>
                  {course.readingMaterials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
                <p>Multimedia Resources:</p>
                <ul>
                  {course.multimediaResources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
                <p>Downloadable Files:</p>
                <ul>
                  {course.downloadableFiles.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Discussion Forums */}
          <div>
            <button
              className="flex items-center justify-between w-full bg-gray-200 rounded-lg px-4 py-2 mb-2 cursor-pointer"
              onClick={() => toggleSection("discussions")}
            >
              <span className="text-lg font-semibold">Discussion Forums</span>
              <svg
                className={`w-6 h-6 transition-transform ${
                  isDiscussionsOpen ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDiscussionsOpen && (
              <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100">
                <p>General Discussion Board: {course.generalDiscussionBoard}</p>
                <p>Topic-Specific Threads:</p>
                <ul>
                  {course.topicSpecificThreads.map((thread, index) => (
                    <li key={index}>{thread}</li>
                  ))}
                </ul>
                <p>Q&A Section: {course.qaSection}</p>
              </div>
            )}
          </div>

          {/* Navigation to other sections or actions */}
          <div className="mt-4">
            <Link href="/courses">
              <a className="btn btn-primary">Back to Courses</a>
            </Link>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default CourseDetails;
