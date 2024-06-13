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
      <footer className="bg-[#1E1C27] text-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-20 pt-52 lg:pt-64 space-y-10 lg:space-y-0 lg:flex gap-10 justify-between">
          <div className="flex flex-col gap-10 max-w-[320px]">
            <Link href="" className="font-semibold text-xl">
              LOGO
            </Link>
            <p className="text-base font-normal text-[#FFFFFFCC]">
              Academia, lorem ipsum
            </p>
          </div>

          {/* navigation */}
          <div className="flex flex-col gap-10 font-normal">
            <p className="text-[20px]">Navigation</p>
            <span className="flex flex-col gap-4 text-base text-[#FFFFFFA3]">
              <Link href="" className="hover:underline duration-150">
                Home
              </Link>
              <Link href="" className="hover:underline duration-150">
                About
              </Link>
              <Link href="" className="hover:underline duration-150">
                Services
              </Link>
              <Link href="" className="hover:underline duration-150">
                Contact Us
              </Link>
              <Link href="" className="hover:underline duration-150">
                FAQs
              </Link>
            </span>
          </div>

          {/* company */}
          <div className="flex flex-col gap-10">
            <p className="text-[20px]">Company</p>
            <span className="flex flex-col gap-4 text-base text-[#FFFFFFA3]">
              <Link href="" className="hover:underline duration-150">
                Terms of Use
              </Link>
              <Link href="" className="hover:underline duration-150">
                Privacy Policy
              </Link>
              <Link href="" className="hover:underline duration-150">
                Our Partners
              </Link>
              <Link href="" className="hover:underline duration-150">
                Testimonials
              </Link>
            </span>
          </div>

          {/* newsletter */}
          <div className="flex flex-col gap-10 max-w-[352px]">
            <p className="text-[20px]">Newsletter</p>
            <div className="flex flex-col gap-4 text-base text-[#FFFFFFA3]">
              <p className="">
                Stay up to date with our latest news and updates.
              </p>
              <form className="flex">
                <input
                  type="text"
                  placeholder="Enter your email"
                  required
                  className="bg-[#141414] text-[#FFFFFFA3] text-base px-[24px] py-[12px] w-full"
                />
                <button
                  title="submit"
                  type="submit"
                  className="btn btn-ghost bg-academia-primary rounded-none hover:bg-academia-primary/90"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12Z"
                      fill="white"
                    />
                    <path
                      d="M18.9722 12C18.8789 11.8452 18.6833 11.5671 18.4695 11.3251C18.0437 10.8432 17.457 10.2928 16.8445 9.76105C16.237 9.23357 15.6265 8.74365 15.1661 8.38437C14.9365 8.20515 14.5402 7.90576 14.407 7.80521C13.9624 7.47768 13.8674 6.85173 14.1949 6.40706C14.5224 5.96236 15.1484 5.86736 15.5931 6.19487L15.5968 6.19767C15.7412 6.30672 16.1598 6.62291 16.3966 6.80767C16.8737 7.18002 17.5132 7.69303 18.1557 8.25084C18.7932 8.80434 19.4565 9.4216 19.9682 10.0008C20.2231 10.2892 20.4615 10.5918 20.6417 10.8906C20.8053 11.162 21.0001 11.5568 21.0001 12C21.0001 12.4431 20.8053 12.838 20.6417 13.1094C20.4615 13.4082 20.2231 13.7108 19.9682 13.9992C19.4565 14.5784 18.7932 15.1957 18.1557 15.7492C17.5132 16.307 16.8737 16.82 16.3966 17.1923C16.1598 17.3771 15.7415 17.6931 15.5971 17.8021L15.5931 17.8051C15.1484 18.1326 14.5224 18.0376 14.1949 17.5929C13.8674 17.1483 13.9624 16.5223 14.407 16.1948C14.5402 16.0942 14.9365 15.7948 15.1661 15.6156C15.6265 15.2564 16.237 14.7664 16.8445 14.2389C17.457 13.7072 18.0437 13.1568 18.4695 12.6749C18.6833 12.4329 18.8789 12.1548 18.9722 12Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>

      {/* copyright */}
      <footer className="bg-[#18171B] text-white px-6 py-3">
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
              className="bg-academia-primary rounded-none hover:bg-academia-primary/90"
            >
              <svg
                width="40"
                height="40"
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
