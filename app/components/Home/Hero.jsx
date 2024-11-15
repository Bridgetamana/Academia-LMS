"use client";

import Image from "next/image";
import Illustration from "@/public/assets/images/certification-illustration.avif";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="mx-auto max-w-screen-xl lg:h-[70vh] px-4 pt-12 lg:pt-0 md:px-8 pb-8 lg:pb-0 lg:flex items-center">
      <div className="lg:space-y-16 space-y-8 flex-none lg:max-w-[440px] text-left text-neutral-900">
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
          src={Illustration}
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
