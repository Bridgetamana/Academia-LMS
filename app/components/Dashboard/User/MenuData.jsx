import Link from "next/link";
import {
  FiBookOpen,
  FiBox,
  FiCalendar,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { MdOutlineDashboardCustomize } from "react-icons/md";

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
      <Link href="assignments" className="text-base">
        Assignments
      </Link>
    ),
    icon: <FiBookOpen className=" font-bold text-[#7C8493] w-5 h-5" />,
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
      <Link href="resources" className="text-base">
        Resources
      </Link>
    ),
    icon: <FiBox className=" font-bold text-[#7C8493] w-5 h-5" />,
    key: "resources",
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
  "resources",
  "settings",
];
