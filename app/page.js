import React from "react";
import { BaseLayout } from "@/app/_layouts";
import {
  Hero,
  Features,
} from "@/app/components/Home";

export default function Home() {
  return (
    <>
      <BaseLayout>
        <Hero />
        <hr className="border border-[#DFE9F3]" />
        <Features />
      </BaseLayout>
    </>
  );
}
