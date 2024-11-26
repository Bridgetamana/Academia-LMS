"use client";

import { useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "antd";
import Link from "next/link";
import useAuthStore from "@/app/_store/authStore";

import { FiBookOpen, FiCalendar, FiLogOut, FiSettings } from "react-icons/fi";
import {
  MdOutlineDashboardCustomize,
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";

const DashboardSider2 = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [activePath, setActivePath] = useState("");

  useLayoutEffect(() => {
    setActivePath(activeKeys.filter((value) => pathName.includes(value))[0]);
  }, [pathName]);

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  const sidebarData1 = [
    {
      label: (
        <Link href="dashboard" className="text-base">
          Dashboard
        </Link>
      ),
      icon: (
        <MdOutlineDashboardCustomize className="font-bold text-[#7C8493] w-5 h-5" />
      ),
      key: "dashboard",
    },
    {
      label: (
        <Link href="courses" className="text-base">
          Courses
        </Link>
      ),
      icon: <FiBookOpen className="font-bold text-[#7C8493] w-5 h-5" />,
      key: "courses",
    },
    {
      label: (
        <Link href="timetable" className="text-base">
          Timetable
        </Link>
      ),
      icon: <LuClipboardList className="font-bold text-[#7C8493] w-5 h-5" />,
      key: "timetable",
    },
    {
      label: (
        <Link href="assignments" className="text-base">
          Assignments
        </Link>
      ),
      icon: (
        <MdOutlineAssignmentTurnedIn className="font-bold text-[#7C8493] w-5 h-5" />
      ),
      key: "assignments",
    },
    {
      label: (
        <Link href="calendar" className="text-base">
          Calendar
        </Link>
      ),
      icon: <FiCalendar className="font-bold text-[#7C8493] w-5 h-5" />,
      key: "calendar",
    },
    {
      label: (
        <Link href="students" className="text-base">
          Students
        </Link>
      ),
      icon: <PiStudentBold className="font-bold text-[#7C8493] w-5 h-5" />,
      key: "students",
    },
    {
      label: (
        <Link href="library" className="text-base">
          Library
        </Link>
      ),
      icon: <PiStudentBold className="font-bold text-[#7C8493] w-5 h-5" />,
      key: "library",
    },
  ];

  const sidebarData2 = [
    {
      label: (
        <Link href="settings" className="text-base">
          Settings
        </Link>
      ),
      icon: <FiSettings className="font-bold text-[#7C8493] w-5 h-5" />,
      key: "settings",
    },
    {
      label: (
        <button onClick={handleLogout} className="text-base">
          Log Out
        </button>
      ),
      icon: <FiLogOut className="font-bold text-[#7C8493] w-5 h-5" />,
      key: "logout",
    },
  ];

  const activeKeys = [
    "dashboard",
    "courses",
    "calendar",
    "timetable",
    "assignments",
    "students",
    "settings",
    "library",
  ];

  return (
    <div className="drawer-side z-10">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <aside className="flex flex-col space-y-4 w-[15rem] shadow-xl bg-white border-r border-r-gray-300 py-2 h-full">
        <Link href="" className="font-semibold text-xl mx-auto py-2.5">
          <div className="avatar placeholder">
            <div className="bg-academia-general text-white rounded-full w-8">
              <span className="text-xl font-mono">A</span>
            </div>
            cademia
          </div>
        </Link>
        <div className="border border-gray-200 mt-6" />
        <div className="space-y-5">
          <Menu
            selectedKeys={[activePath]}
            items={sidebarData1}
            className="!space-y-4 !w-full"
            mode="inline"
          />
          <div className="border border-gray-200 mt-6" />
          <Menu
            selectedKeys={[activePath]}
            items={sidebarData2}
            className="!space-y-4 !w-full"
            mode="inline"
          />
        </div>
      </aside>
    </div>
  );
};

export default DashboardSider2;
