"use client";

import Link from "next/link";

const Nav = () => {
  return (
    <nav className="pt-12">
      <div className="flex justify-center">
        <Link href="/" className="font-semibold text-2xl flex items-center">
          <div className="avatar placeholder">
            <div className="bg-academia-general text-white rounded-full w-8">
              <span className="text-xl font-mono">A</span>
            </div>
          </div>
          cademia
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
