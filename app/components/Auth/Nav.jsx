"use client";

import Link from "next/link";

const Nav = () => {
  return (
    <nav className="pt-12">
      <div className="flex justify-center">
        <Link href="/" className="font-semibold text-2xl">
          Academia
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
