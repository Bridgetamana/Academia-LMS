"use client";

import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="w-full border-neutral-200 sticky top-0 backdrop-blur-md z-[999] shadow-sm bg-white/80 py-2 md:py-4">
      <div className="items-center max-w-screen-2xl mx-auto flex justify-between p-4 lg:p-0">
        <Logo />
        <div className="md:px-8 flex items-center gap-2">
          <Link
            href="/signin"
            className="text-neutral-600 hover:text-primary-500 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="py-1.5 px-3.5 font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-full transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
