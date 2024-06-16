"use client";

import Image from "next/image";
import School from "@/public/assets/images/school.jpg";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="mx-auto max-w-screen-xl lg:h-[70vh] px-4 pt-12 lg:pt-0 md:px-8 pb-8 lg:pb-0 lg:flex items-center">
      {/* bg-[url('/assets/images/AI-mobile.png')] bg-no-repeat bg-contain lg:bg-none bg-right */}

      <div className="lg:space-y-16 space-y-8 flex-none lg:max-w-[440px] text-left text-[#080808]">
        {/* <div className="bg-[#00B2A9] h-[143px] lg:h-[215px] w-[56px] lg:w-[76px]" /> */}
        <div>
          <h1 className=" font-semibold text-[30px] md:text-[40px]">
            Academia LMS: Your All-in-One Solution
          </h1>
          <p className="py-6">
            Effortlessly manage your academic responsibilities and boost
            productivity with our comprehensive platform for students and
            educators.
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="text-white btn btn-ghost text-[14px] bg-academia-general hover:bg-academia-general/90 py-3 px-8 font-medium rounded-[24px]"
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="lg:flex-1 lg:flex hidden text-center mt-4 lg:mt-0 lg:ml-6 max-w-[1080px] w-full">
        <Image
          src={School}
          className="w-full lg:w-full h-ful"
          alt="school"
          width={900}
          height={900}
        />
      </div>
    </section>
  );
};

export default Hero;
