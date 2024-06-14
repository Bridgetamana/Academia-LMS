"use client";

import Image from "next/image";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";

const Navbar = () => {
  const [state, setState] = useState(false);

  return (
    <nav className="w-full border-b md:border-0 sticky top-0 backdrop-blur-md z-[999]">
      <div className="items-center max-w-screen-2xl mx-auto md:flex">
        <div className="flex items-center  px-4 md:px-8 justify-between py-3 md:py-5 md:block">
          <Link href="" className="font-semibold text-xl">
            LOGO
          </Link>
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
        <div className="hidden md:inline-block md:px-8">
          <Link
            href="/signup"
            className="py-3 px-4 btn btn-ghost font-medium rounded-none text-[14px] text-white bg-academia-primary hover:bg-academia-primary/90"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
