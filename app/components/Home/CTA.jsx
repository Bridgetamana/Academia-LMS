import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 md:px-8 h-max relative">
      <div className=" bg-gray-500 flex justify-center items-center min-h-[300px] lg:min-h-[360px] p-10 lg:px-0 rounded-3xl">
        {/* bg-[url('/assets/images/green-bg.png')] bg-cover bg-no-repeat */}
        <div className="flex flex-col gap-6 justify-center max-w-[730px] mx-auto">
          <h2 className="text-white font-medium text-[32px] md:text-[64px] text-center leading-none">
            A transformative journey is just a click away.
          </h2>
          <Link
            href=""
            className="bg-academia-primary py-[16px] px-[24px] text-white font-bold text-[20px] mx-auto"
          >
            Try for Free!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
