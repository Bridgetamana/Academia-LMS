"use client";

import React from "react";
import { Dropdown, message } from "antd";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoChatboxEllipses, IoNotifications } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DashNav = () => {
  const router = useRouter();

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

  const messages = [
    {
      key: "1",
      label: <p className="">No messages yet</p>,
    },
  ];

  const notifications = [
    {
      key: "1",
      label: <p className="">(0) notifications</p>,
    },
  ];

  const profile = [
    {
      key: "1",
      label: <Link href="settings">Settings</Link>,
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => {
            useAuthStore.getState().logout(); // Call logout action from Zustand
            message.success("Logged out successfully!");
            router.push("/signin"); // Redirect to signin page after logout
          }}
        >
          Log Out
        </button>
      ),
    },
  ];

  return (
    <>
      <nav className="flex gap-6 items-center px-4 lg:px-8 py-3">
        <label htmlFor="my-drawer-2" className="flex lg:hidden">
          <CgMenuRightAlt size="25" />
        </label>

        <div className="w-full flex gap-8 justify-between items-center">
          <span className="flex flex-col gap-1">
            <p className="text-[14px] xs:text-base lg:text-xl font-semibold">
              {getGreeting()}, <span>{displayName || "User"}</span>
            </p>
            <p className="text-sm hidden lg:flex">
              {/* Welcome back to the world of knowledge! */}
              Your learning adventure continues!
              {/* Ready to conquer new challenges today? */}
            </p>
          </span>

          <span className="flex gap-4">
            <Dropdown
              menu={{
                items: messages,
              }}
              placement="bottomRight"
            >
              <button
                type="button"
                className="p-2 bg-white rounded-full text-gray-600 hover:text-academia-general active:scalgite-95"
              >
                <IoChatboxEllipses className="w-6 h-6" />
              </button>
            </Dropdown>

            <Dropdown
              menu={{
                items: notifications,
              }}
              placement="bottomRight"
            >
              <button
                type="button"
                className="p-2 bg-white rounded-full text-gray-500 hover:text-academia-general/90 active:scale-95"
              >
                <span className="relative">
                  <IoNotifications className="w-6 h-6" />
                  <span className="rounded-full w-2 h-2 badge-primary indicator-item absolute -top-1 right-0" />
                </span>
              </button>
            </Dropdown>

            <Dropdown
              menu={{
                items: profile,
              }}
              placement="bottomRight"
            >
              <button type="button" className="avatar w-10 active:scale-95">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt=''
                  className="rounded-full"
                />
              </button>
            </Dropdown>
          </span>
        </div>
      </nav>
      <div className=" border border-gray-200" />
    </>
  );
};

export default DashNav;
