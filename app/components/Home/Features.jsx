import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-24 lg:flex">
      <div className="text-center w-full flex flex-col gap-6">
        <span>
          <p className="text-[14px] font-bold text-[#1E1C27]">FEATURES</p>
          <hr className="border-[2px] border-[#8A2387] w-[40px] mx-auto" />
        </span>

        <p className="text-[#7A8A98] text-[20px] md:text-[32px]">
          An overview of our features.
        </p>

        <h2>Features</h2>

        {/* Add Academia features here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src=""
              alt="Feature 1"
              width={300}
              height={200}
            />
            <h3>Automated Task Management</h3>
            <p>Efficiently manage assignments and deadlines.</p>
          </div>
          <div>
            <Image
              src=""
              alt="Feature 2"
              width={300}
              height={200}
            />
            <h3>Personalized Study Schedules</h3>
            <p>Create customized study plans based on individual habits.</p>
          </div>
          <div>
            <Image
              src=""
              alt="Feature 3"
              width={300}
              height={200}
            />
            <h3>Real-Time Notifications</h3>
            <p>
              Stay updated with instant alerts on course updates and deadlines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
