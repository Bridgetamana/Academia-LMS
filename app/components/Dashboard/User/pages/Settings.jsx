import { UserDashboardLayout } from "@/app/_layouts";
import React from "react";

const Settings = () => {
  return (
    <UserDashboardLayout>
      <section className="max-w-[1640px] flex flex-col gap-6 px-6 py-4 pb-8 md:h-screen overflow-y-scroll">
        <div>Settings</div>
      </section>
    </UserDashboardLayout>
  );
};

export default Settings;
