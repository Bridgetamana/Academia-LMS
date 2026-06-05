"use client";

import React, { useState } from "react";
import { IoChatboxEllipses, IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const DashNav2 = ({ userRole = "student" }) => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null); // 'messages' | 'notifications' | 'profile' | null

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good morning";
    if (currentHour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = (type) => {
    if (activeDropdown === type) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(type);
    }
  };

  const currentUser = auth?.currentUser;

  return (
    <div className="sticky top-0 z-50 bg-white">
      <nav className="flex gap-6 items-center px-4 lg:px-8 py-4 shadow-sm">
        <div className="w-full flex gap-8 justify-between items-center">
          <span className="flex flex-col gap-1">
            <h1 className="text-[14px] xs:text lg:text-xl font-semibold text-neutral-800">
              {getGreeting()},{" "}
            </h1>
            <p className="text-sm hidden lg:flex text-neutral-600">
              {userRole === "educator" 
                ? "Let's inspire minds and shape the future together!"
                : userRole === "admin"
                ? "Manage and oversee your learning platform"
                : "Ready to learn something new today?"}
            </p>
          </span>

          <div className="flex items-center gap-4 relative">
            {/* Messages Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("messages")}
                className="p-1.5 bg-neutral-50 rounded-full text-neutral-600 hover:text-primary hover:bg-neutral-100 transition-colors"
              >
                <IoChatboxEllipses className="w-6 h-6" />
              </button>
              {activeDropdown === "messages" && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-100 py-3 px-4 z-50">
                  <p className="text-sm text-neutral-600">No messages yet</p>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("notifications")}
                className="p-1.5 bg-neutral-50 rounded-full text-neutral-600 hover:text-primary hover:bg-neutral-100 transition-colors"
              >
                <IoNotifications className="w-6 h-6" />
              </button>
              {activeDropdown === "notifications" && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-100 py-3 px-4 z-50">
                  <p className="text-sm text-neutral-600">(0) notifications</p>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                type="button" 
                onClick={() => toggleDropdown("profile")}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-neutral-50 transition-colors"
              >
                <img
                  src={currentUser?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-neutral-200"
                />
              </button>
              {activeDropdown === "profile" && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-neutral-100 py-1 z-50">
                  <Link 
                    href="/settings" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <IoMdSettings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashNav2;