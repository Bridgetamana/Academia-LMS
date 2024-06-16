"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { IoChevronUp } from "react-icons/io5";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section>
      {/* copyright */}
      <footer className=" text-[#080808] px-6 py-3">
        {/* lg:h-[80px] */}
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 space-y-5 lg:space-y-0 lg:flex gap-4 lg:gap-8 justify-between items-center">
          <p className="py- text-center lg:text-start">
            Copyright © {currentYear} All rights reserved{" "}
            <Link href="" className="text-[#00B2A9] hover:underline">
              {" "}
              Academia
            </Link>{" "}
          </p>
          <span className="flex gap-6 items-center justify-center lg:justify-start">
            <Link href="" className="">
              <FaInstagram className="w-4 h-4 hover:text-academia-general duration-150" />
            </Link>
            <Link href="" className="">
              <FaLinkedinIn className="w-4 h-4 hover:text-academia-general duration-150" />
            </Link>
            <Link href="" className="">
              <FaFacebookF className="w-4 h-4 hover:text-academia-general duration-150" />
            </Link>
            <Link href="" className="">
              <FaXTwitter className="w-4 h-4 hover:text-academia-general duration-150" />
            </Link>

            <button
              onClick={scrollToTop}
              title="Back to Top"
              type="button"
              className="bg-academia-general rounded-full hover:bg-academia-general/90 text-white p-2 hover:bg-gray-700"
            >
              <IoChevronUp className="w-5 h-5 " />
            </button>
          </span>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
