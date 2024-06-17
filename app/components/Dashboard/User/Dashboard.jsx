import { UserDashboardLayout } from "@/app/_layouts";
import React from "react";
import CalendarView from "./CalendarView";
import { BsThreeDotsVertical, BsStopwatch } from "react-icons/bs";
import Image from "next/image";
import Course1 from "@/public/assets/images/course-1.jpg";
import Course2 from "@/public/assets/images/course-2.jpg";
import Link from "next/link";

const Dashboard = () => {
  return (
    <UserDashboardLayout>
      <section className="max-w-[1640px] flex flex-col gap-6 px-4 lg:px-8 py-8 md:h-screen overflow-y-scroll">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_30%] gap-8">
          <div className="flex flex-col gap-6">
            <span className="flex flex-col gap-2">
              <h2 className="lg:text-xl font-semibold">
                Recently Accessed Courses
              </h2>
              <p className="text-sm">
                Some of the courses you've recently viewed or interacted with.
              </p>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* flex overflow-x-scroll */}
              <Link href="" title="CSC 101" className="bg-white rounded-lg p-1">
                <div className="bg-[#FCF0D7] rounded-lg p-1 relative pb-20">
                  <Image src={Course1} alt="course" className="" />
                  <span className="flex justify-center">
                    <span className="flex flex-col gap-1 absolute bottom-4 px-4">
                      <p className="font-semibold">CSC 101</p>
                      <p className="text-xs font-medium">
                        Self-paced course • 4 weeks
                      </p>
                    </span>
                  </span>
                </div>
              </Link>
              <Link href="" title="CSC 101" className="bg-white rounded-lg p-1">
                <div className="bg-[#CCF4FD] rounded-lg p-1 relative pb-20">
                  <Image src={Course2} alt="course" className="" />
                  <span className="flex justify-center">
                    <span className="flex flex-col gap-1 absolute bottom-4 px-4">
                      <p className="font-semibold">CSC 101</p>
                      <p className="text-xs font-medium">
                        Self-paced course • 4 weeks
                      </p>
                    </span>
                  </span>
                </div>
              </Link>
              <Link href="" title="CSC 101" className="bg-white rounded-lg p-1">
                <div className="bg-[#FCF0D7] rounded-lg p-1 relative pb-20">
                  <Image src={Course1} alt="course" className="" />
                  <span className="flex justify-center">
                    <span className="flex flex-col gap-1 absolute bottom-4 px-4">
                      <p className="font-semibold">CSC 101</p>
                      <p className="text-xs font-medium">
                        Self-paced course • 4 weeks
                      </p>
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* calendar */}
          <div className="place-self-end">
            <CalendarView />
          </div>

          <div className="bg-white rounded-lg p-6">Broad Selection</div>

          {/* schedule */}
          <div className="flex flex-col gap-8">
            <span className="flex flex-col gap-2 bg-white rounded-lg p-6">
              <h2 className="lg:text-xl font-semibold">My Schedule</h2>
              <p className="text-sm">
                Don't forget to check your daily schedule
              </p>
            </span>

            <div className="flex flex-col gap-4">
              {/* upcoming classes */}
              <h2 className="lg:text-lg font-semibold">Upcoming Classes</h2>
              <div className="bg-green-300 rounded-lg py-4 px-6 flex gap-6 justify-between items-center">
                <span className="flex flex-col gap-2">
                  <p className="lg:text-xl font-semibold">MTH 101 </p>
                  <span className="flex gap-4">
                    <BsStopwatch className="w-5 h-5" />{" "}
                    <p className="text-sm font-medium">16 June • 18:00</p>
                  </span>
                </span>
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-black/20 active:scale-95"
                >
                  <BsThreeDotsVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* deadlines */}
            <div className="flex flex-col gap-4">
              <h2 className="lg:text-lg font-semibold">Deadlines</h2>

              <div className="bg-red-300 rounded-lg py-4 px-6 flex gap-6 justify-between items-center">
                <span className="flex flex-col gap-2">
                  <p className="lg:text-xl font-semibold">
                    CSC 101 Group Project{" "}
                  </p>
                  <span className="flex gap-4">
                    <BsStopwatch className="w-5 h-5" />{" "}
                    <p className="text-sm font-medium">16 June • 18:00</p>
                  </span>
                </span>
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-black/20 active:scale-95"
                >
                  <BsThreeDotsVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserDashboardLayout>
  );
};

export default Dashboard;
