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
      <footer className="bg-[#141416] text-white px-6 py-3">
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
              <FaInstagram className="w-5 h-5 hover:text-academia-primary duration-150" />
            </Link>
            <Link href="" className="">
              <FaLinkedinIn className="w-5 h-5 hover:text-academia-primary duration-150" />
            </Link>
            <Link href="" className="">
              <FaFacebookF className="w-5 h-5 hover:text-academia-primary duration-150" />
            </Link>
            <Link href="" className="">
              <FaXTwitter className="w-5 h-5 hover:text-academia-primary duration-150" />
            </Link>

            <button
              onClick={scrollToTop}
              title="Back to Top"
              type="button"
              className="bg-academia-primary rounded-full hover:bg-academia-primary/90"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 25C30 25 22.6352 15 20 15C17.3647 15 10 25 10 25"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </span>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
