"use client";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full border-b md:border-0 sticky top-0 backdrop-blur-md z-[999] shadow-sm">
      <div className="items-center max-w-screen-2xl mx-auto flex justify-between p-4 lg:p-0">
        <div className="flex items-center  px-4 md:px-8 justify-between py-3 md:py-5 md:block">
          <Link href="/" className="font-semibold text-xl">
            LOGO
          </Link>
        </div>
        <div className="md:px-8">
          <Link
            href="/signup"
            className="py-2 px-8 btn btn-ghost font-medium text-[14px] text-white bg-academia-primary hover:bg-academia-primary/90 rounded-[24px] "
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
