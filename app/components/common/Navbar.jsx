"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full border-b md:border-0 sticky top-0 backdrop-blur-md z-[999] shadow-sm">
      <div className="items-center max-w-screen-2xl mx-auto flex justify-between p-4 lg:p-0">
        <div className="flex items-center  px-4 md:px-8 justify-between py-3 md:py-5 md:block">
          <Link href="/" className="font-semibold text-xl">
            <div className="avatar placeholder">
              <div className="bg-academia-general text-white rounded-full w-8">
                <span className="text-xl font-mono">A</span>
              </div>
              cademia
            </div>
          </Link>
        </div>
        <div className="md:px-8">
          <Link
            href="/signup"
            className="py-3 px-6 font-medium text-[12px] text-white bg-academia-general hover:bg-academia-general/90 rounded-[24px] "
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
