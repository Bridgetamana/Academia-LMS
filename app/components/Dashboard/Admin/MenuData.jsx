import Link from "next/link";
import { FiBookOpen, FiCalendar, FiLogOut, FiSettings } from "react-icons/fi";
import {
  MdOutlineDashboardCustomize,
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";

export const sidebarData1 = [
  {
    label: (
      <Link href="dashboard" className="text-base">
        Dashboard
      </Link>
    ),
    icon: (
      <MdOutlineDashboardCustomize className=" font-bold text-[#7C8493] w-5 h-5" />
    ),
    key: "dashboard",
  },
  {
    label: (
      <Link href="courses" className="text-base">
        Courses
      </Link>
    ),
    icon: <FiBookOpen className=" font-bold text-[#7C8493] w-5 h-5" />,
    key: "courses",
  },
  {
    label: (
      <Link href="timetable" className="text-base">
        Timetable
      </Link>
    ),
    icon: <LuClipboardList className=" font-bold text-[#7C8493] w-5 h-5" />,
    key: "timetable",
  },
  {
    label: (
      <Link href="assignments" className="text-base">
        Assignments
      </Link>
    ),
    icon: (
      <MdOutlineAssignmentTurnedIn className=" font-bold text-[#7C8493] w-5 h-5" />
    ),
    key: "assignments",
  },
  {
    label: (
      <Link href="calendar" className="text-base">
        Calendar
      </Link>
    ),
    icon: <FiCalendar className=" font-bold text-[#7C8493] w-5 h-5" />,
    key: "calendar",
  },
  {
    label: (
      <Link href="students" className="text-base">
        Students
      </Link>
    ),
    icon: <PiStudentBold className=" font-bold text-[#7C8493] w-5 h-5" />,
    key: "students",
  },
];
export const sidebarData2 = [
  {
    label: (
      <Link href="settings" className="text-base">
        Settings
      </Link>
    ),
    icon: <FiSettings className=" font-bold text-[#7C8493] w-5 h-5" />,
    key: "settings",
  },
  {
    label: (
      <Link href="/signin" className="text-base">
        Log Out
      </Link>
    ),
    icon: <FiLogOut className=" font-bold text-[#7C8493] w-5 h-5" />,
    key: "logout",
  },
];
export const activeKeys = [
  "dashboard",
  "courses",
  "calendar",
  "timetable",
  "assignments",
  "students",
  "settings",
];
