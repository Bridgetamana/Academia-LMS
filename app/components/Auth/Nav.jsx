"use client";

import Image from "next/image";
import { useState } from "react";
// import Logo from "@/public/assets/images/logo.png";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";

const Nav = () => {
  const [state, setState] = useState(false);

  return (
    <nav className="w-full border-b md:border-0 sticky top-0 backdrop-blur-md z-[999]">
      <div className="items-center max-w-screen-2xl mx-auto md:flex justify-between">
        <div className="flex items-center  px-4 md:px-8 justify-between py-3 md:py-5 md:block">
          <Link href="" className="font-semibold text-xl">
            LOGO
          </Link>
          {/* <Link href="">
            <Image src={Logo} width={120} height={50} alt="Logo" />
          </Link> */}
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <IoClose className="h-6 w-6" />
              ) : (
                <IoMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
