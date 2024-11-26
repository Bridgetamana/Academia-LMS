"use client";

import React from "react";
import { Dropdown, Badge, Avatar, message } from "antd";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoChatboxEllipses, IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const DashNav2 = ({ userRole = "student" }) => {
  const router = useRouter();
  const auth = getAuth();

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Logged out successfully!");
      router.push("/signin");
    } catch (error) {
      message.error("Failed to logout. Please try again.");
    }
  };

  const profile = [
    {
      key: "1",
      label: (
        <Link 
          href="/settings" 
          className="flex items-center gap-2 px-2 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
        >
          <IoMdSettings className="w-4 h-4" />
          Settings
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-2 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <FiLogOut className="w-4 h-4" />
          Log Out
        </button>
      ),
    },
  ];

  const messages = [
    {
      key: "1",
      label: (
        <div className="px-2 py-3">
          <p className="text-sm text-neutral-600">No messages yet</p>
        </div>
      ),
    },
  ];

  const notifications = [
    {
      key: "1",
      label: (
        <div className="px-4 py-3">
          <p className="text-sm text-neutral-600">(0) notifications</p>
        </div>
      ),
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white">
      <nav className="flex gap-6 items-center px-4 lg:px-8 py-4 shadow-sm">
        <label 
          htmlFor="my-drawer-2" 
          className="flex lg:hidden cursor-pointer hover:text-primary transition-colors"
        >
          <CgMenuRightAlt size="26" />
        </label>

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

          <div className="flex items-center gap-2">
            <Dropdown
              menu={{ items: messages }}
              placement="bottomRight"
              trigger={["click"]}
              overlayClassName="w-64"
            >
              <button
                type="button"
                className="p-1.5 bg-neutral-50 rounded-full text-neutral-600 hover:text-primary hover:bg-neutral-100 transition-colors"
              >
                <IoChatboxEllipses className="w-6 h-6" />
              </button>
            </Dropdown>

            <Dropdown
              menu={{ items: notifications }}
              placement="bottomRight"
              trigger={["click"]}
              overlayClassName="w-64"
            >
              <button
                type="button"
                className="p-1.5 bg-neutral-50 rounded-full text-neutral-600 hover:text-primary hover:bg-neutral-100 transition-colors"
              >
                <IoNotifications className="w-6 h-6" />
              </button>
            </Dropdown>

            <Dropdown
              menu={{ items: profile }}
              placement="bottomRight"
              trigger={["click"]}
              overlayClassName="w-48"
            >
              <button 
                type="button" 
                className="flex items-center gap-2 p-1 rounded-full hover:bg-neutral-50 transition-colors"
              >
                <Avatar
                  src={auth.currentUser?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                  alt="Profile"
                  className="w-8 h-8"
                />
              </button>
            </Dropdown>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashNav2;