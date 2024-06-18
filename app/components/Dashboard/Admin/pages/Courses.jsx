import { AdminDashboardLayout } from "@/app/_layouts";
import React from "react";

const Courses = () => {
  return (
    <AdminDashboardLayout>
      <section className="max-w-[1640px] flex flex-col gap-6 px-6 py-4 pb-8 md:h-screen overflow-y-scroll">
        <div>Courses</div>
      </section>
    </AdminDashboardLayout>
  );
};

export default Courses;
