import Image from "next/image";
import School from "@/public/assets/images/school.jpg";

const Hero = () => {
  return (
    <section className="mx-auto max-w-screen-xl lg:h-[70vh] px-4 md:px-8 pb-8 lg:pb-0 lg:flex items-center">
      {/* bg-[url('/assets/images/AI-mobile.png')] bg-no-repeat bg-contain lg:bg-none bg-right */}

      <div className="lg:space-y-16 space-y-8 flex-none lg:max-w-[440px] text-left">
        {/* <div className="bg-[#00B2A9] h-[143px] lg:h-[215px] w-[56px] lg:w-[76px]" /> */}
        <div>
          <h1 className="text-[#1E1C27] font-medium text-[28px] md:text-[36px]">
            Academia LMS: Your All-in-One Solution
          </h1>
          <p className="py-6">
            Effortlessly manage your academic responsibilities and boost
            productivity with our comprehensive platform for students and
            educators.
          </p>
          <button className="text-white bg-academia-primary hover:bg-academia-primary/90 py-3 px-8 btn btn-ghost font-medium rounded-[24px] text-[14px]">
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
