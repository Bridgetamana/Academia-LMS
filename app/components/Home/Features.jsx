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
          <div className="card w-96 shadow-xl">
            <div className="card-body">
              <span className=" text-start">
                <p>Lo</p>
                <h2 className="card-title">Stay Updated, Instantly</h2>
              </span>
              <p className=" text-start">
                Receive immediate notifications when new course materials,
                lecture notes, or supplemental readings are available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
