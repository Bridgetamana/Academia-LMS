"use client";

import Image from "next/image";
import { useState } from "react";
// import Logo from "@/public/assets/images/logo.png";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";

const Nav = () => {
  const [state, setState] = useState(false);

  const navigation = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Contact", path: "/contact" },
    { title: "FAQ", path: "/faq" },
  ];

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
        <div
          className={`md:px-8 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
            state
              ? "flex justify-center text-center pt-12 absolute h-screen w-full p-4 backdrop-blur-lg bg-black/70 text-white"
              : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="md:text-[14px] text-[22px] text-white md:text-[#1E1C27] font-medium hover:text-academia-primary duration-150 uppercase"
                >
                  <Link
                    href={item.path}
                    className="group transition duration-300"
                  >
                    {item.title}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-academia-primary" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
