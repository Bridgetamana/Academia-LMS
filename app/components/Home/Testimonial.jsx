"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Rating } from "@/app/components/common";

import Author1 from "@/public/assets/images/author.jpg";
import Author2 from "@/public/assets/images/author.jpg";
import Author3 from "@/public/assets/images/author.jpg";

const Testimonial = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    {
      id: "tab1",
      name: "Frank Madamin",
      title: "Sales Manager",
      image: Author3,
      content: {
        title: "Beyond Expectations",
        description:
          "academia exceeded my expectations in every way. The Symptom Checker is incredibly intuitive, providing instant clarity during moments of uncertainty. The wearable integration is a brilliant touch, giving me a comprehensive view of my health trends. Medication reminders have turned a daily chore into a seamless routine. I've never felt this in control of my health. academia has not just met but surpassed my expectations, becoming an indispensable part of my health journey.",
      },
    },
    {
      id: "tab2",
      name: "Abella Taylor",
      title: "Fitness Specialist",
      image: Author2,
      content: {
        title: "Excellent Fitness Support",
        description:
          "academia has been a game-changer for my fitness routine. The integration with my wearable devices helps me keep track of my progress and stay motivated. The fitness plans are tailored to my needs, and I've seen significant improvements in my health and performance. I highly recommend academia to anyone serious about their fitness journey.",
      },
    },
    {
      id: "tab3",
      name: "Cole Duncan",
      title: "Businessman",
      image: Author1,
      content: {
        title: "Efficient and Reliable",
        description:
          "As a busy professional, I rely on academia to manage my health efficiently. The medication reminders and health trend analysis tools have been incredibly helpful. The platform is user-friendly and reliable, making it easier for me to stay on top of my health goals despite a hectic schedule.",
      },
    },
  ];

  return (
    <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-24 lg:flex">
      <div className="text-center w-full flex flex-col gap-6">
        <span>
          <p className="text-[14px] font-bold text-[#1E1C27] uppercase">
            Testimonial
          </p>
          <hr className="border-[2px] border-[#00B2A9] w-[40px] mx-auto" />
        </span>

        <p className="text-[#7A8A98] text-[20px] md:text-[32px]">
          What people have to say about us.
        </p>

        {/* testimonials */}
        <div className="w-full hidden lg:grid md:grid-cols-[40%_60%] gap-8">
          <div className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex gap-5 items-center max-w-[400px] px-[40px] py-[24px] focus:shadow-md shadow-[#1A1A1A14] ${
                  activeTab === tab.id ? "bg-white" : ""
                }`}
              >
                <Image
                  src={tab.image}
                  className="w-[40px] h-[40px]"
                  alt="author"
                  width={40}
                  height={40}
                />
                <span className="flex flex-col">
                  <p className="text-[#1A1A1A] text-base md:text-[20px] font-medium">
                    {tab.name}
                  </p>
                  <p className="text-[#7A8A98] text-[12px] md:text-[14px] text-start">
                    {tab.title}
                  </p>
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-8 justify-start text-start">
            {tabs.map(
              (tab) =>
                activeTab === tab.id && (
                  <div key={tab.id} className="flex flex-col gap-4">
                    <p className="font-bold text-[24px] text-[#1A1A1A]">
                      {tab.content.title}
                    </p>
                    <Rating />
                    <p className="text-[#7A8A98] text-[20px] max-w-xl font-normal">
                      {tab.content.description}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>

        {/* mobile testimonials */}
        <div className="lg:hidden flex flex-col gap-3">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="collapse text-start">
              <input
                type="radio"
                name="my-accordion-1"
                // defaultChecked={index === 0}
              />
              <div className="collapse-title w-full p-0">
                <button
                  type="button"
                  className="flex gap-5 items-center w-full px-[40px] py-[24px] shadow-md shadow-[#1A1A1A14] bg-white"
                >
                  <Image
                    src={tab.image}
                    className="w-[40px] h-[40px]"
                    alt="author"
                    width={40}
                    height={40}
                  />
                  <span className="flex flex-col">
                    <p className="text-[#1A1A1A] text-base md:text-[20px] font-medium">
                      {tab.name}
                    </p>
                    <p className="text-[#7A8A98] text-[12px] md:text-[14px] text-start">
                      {tab.title}
                    </p>
                  </span>
                </button>
              </div>
              <div className="collapse-content">
                <div className="flex flex-col gap-8 justify-start text-start pt-4">
                  <div className="flex flex-col gap-4">
                    <p className="font-bold text-[24px] text-[#1A1A1A]">
                      {tab.content.title}
                    </p>
                    <Rating />
                  </div>
                  <p className="text-[#7A8A98] text-[20px] font-normal">
                    {tab.content.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
