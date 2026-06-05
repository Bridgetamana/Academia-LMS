"use client";

import React, { useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";

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

  useLayoutEffect(() => {
    const matched = activeKeys.find((key) => pathName.includes(key)) || "";
    setActivePath(matched);
  }, [pathName]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <MdOutlineDashboardCustomize className="w-5 h-5" />,
      href: "/admin/dashboard",
      key: "dashboard",
    },
    {
      label: "Courses",
      icon: <FiBookOpen className="w-5 h-5" />,
      href: "/admin/courses",
      key: "courses",
    },
    {
      label: "Timetable",
      icon: <LuClipboardList className="w-5 h-5" />,
      href: "/admin/timetable",
      key: "timetable",
    },
    {
      label: "Assignments",
      icon: <MdOutlineAssignmentTurnedIn className="w-5 h-5" />,
      href: "/admin/assignments",
      key: "assignments",
    },
    {
      label: "Calendar",
      icon: <FiCalendar className="w-5 h-5" />,
      href: "/admin/calendar",
      key: "calendar",
    },
    {
      label: "Students",
      icon: <PiStudentBold className="w-5 h-5" />,
      href: "/admin/students",
      key: "students",
    },
    {
      label: "Library",
      icon: <PiStudentBold className="w-5 h-5" />,
      href: "/admin/library",
      key: "library",
    },
  ];

  const bottomItems = [
    {
      label: "Settings",
      icon: <FiSettings className="w-5 h-5" />,
      href: "/admin/settings",
      key: "settings",
    },
  ];

  return (
    <div className="w-[15rem] shrink-0 z-10">
      <aside className="flex flex-col space-y-4 w-[15rem] shadow-xl bg-white border-r border-r-neutral-200 py-4 h-full fixed left-0 top-0">
        <Link href="/admin/dashboard" className="font-semibold text-xl mx-auto py-2.5 flex items-center gap-2">
          <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">A</span>
          <span className="text-neutral-800">cademia</span>
        </Link>
        
        <div className="border border-neutral-100" />
        
        <div className="flex-1 flex flex-col justify-between px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activePath === item.key;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary-50 text-primary-600"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    <span className={isActive ? "text-primary-600" : "text-neutral-400"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="space-y-1">
            {bottomItems.map((item) => {
              const isActive = activePath === item.key;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary-50 text-primary-600"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    <span className={isActive ? "text-primary-600" : "text-neutral-400"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
              >
                <FiLogOut className="text-red-500 w-5 h-5" />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default DashboardSider2;
