import Image from "next/image";
import School from "@/public/assets/images/school.jpg";

const Hero = () => {
  return (
    <section className="mx-auto max-w-screen-xl lg:h-[90vh] px-4 md:px-8 pt-24 pb-8 lg:pb-0 lg:flex ">
      {/* bg-[url('/assets/images/AI-mobile.png')] bg-no-repeat bg-contain lg:bg-none bg-right */}

      <div className="lg:space-y-16 space-y-8 flex-none lg:max-w-[440px] text-left">
        <div className="flex items-center">
          <div className="bg-[#00B2A9] h-[143px] lg:h-[215px] w-[56px] lg:w-[76px]" />
          <h1 className="text-[#1E1C27] font-medium text-[20px] md:text-[36px] -ml-10">
            Fast and Intuitive <br />
            <span className="text-[80px] md:text-[100px] lg:text-[120px] xl:text-[144px] leading-none font-bold text-[#1A1A1A]">
              CARE
            </span>
          </h1>
        </div>
        <div className="flex gap-4 items-center backdrop-blur-sm bg-white/40 lg:bg-transparent lg:backdrop-blur-none">
          <div className="bg-[#8A2387] h-[57px] w-[4px]" />
          <p className="text-[#7A8A98] max-w-xl leading-relaxed text-[14px] md:text-base">
            Lorem ipsum
          </p>
        </div>
        <div className="lg:pt-6">
          <button
            type="button"
            className="border border-transparent md:border-[#1E1C27] bg-[#8A2387] md:bg-transparent px-[72px] py-[24px] font-bold text-[14px] text-white md:text-[#1E1C27] w-full md:w-max"
          >
            Let&apos;s Go
          </button>
        </div>
      </div>

      <div className="lg:flex-1 lg:flex hidden text-center mt-4 lg:mt-0 lg:ml-3 max-w-[1080px] w-full">
        <Image
          src={School}
          className="w-full lg:w-full h-ful"
          alt="school"
          width={1200}
          height={900}
        />
      </div>
    </section>
  );
};

export default Hero;
