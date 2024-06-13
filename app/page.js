import React from "react";
import { BaseLayout } from "@/app/_layouts";
import {
  Hero,
  Features,
  Testimonial,
  Team,
  FAQs,
  CTA,
} from "@/app/components/Home";

export default function Home() {
  return (
    <>
      <BaseLayout>
        <Hero />
        <hr className="border border-[#DFE9F3]" />
        <Features />
        <hr className="border border-[#DFE9F3]" />
        <Testimonial />
        <Team />
        <hr className="border border-[#DFE9F3]" />
        <div className="relative">
          <FAQs />
          <div className="absolute -bottom-[15%] lg:-bottom-[20%] w-full ">
            <CTA />
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
